import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { UserModule } from './user/user.module';
import databaseConfig from './config/configurations';

const { NODE_ENV } = process.env;
const args = {};
process.argv.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value !== undefined) {
    args[key] = value;
  }
});
console.log('process.argv', process.argv);
console.log('process.argv', args);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        // @TODO： 待拓展， 不同level日志需要分开储存
        transport:
          process.env.NODE_ENV === 'local'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { type, host, port, username, password, database, entities } =
          configService.get('db');

        return {
          type,
          host,
          port: Number(port),
          username: NODE_ENV !== 'local' ? args['u'] : username,
          password: NODE_ENV !== 'local' ? args['p'] : password,
          database,
          entities: [entities],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
