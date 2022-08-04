import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          type,
          host,
          port,
          username,
          password,
          database,
          entities,
          synchronize,
        } = configService.get('db');

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
