import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// Use the corresponding .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// General DB connection config
const ormDbConfig: MysqlConnectionOptions = {
  type: <'mysql'>process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: parseInt(<string>process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
};

// Specific config for production
const ormConfig_production = {
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  ssl: true,
};

// Specific config for development
const ormConfig_development = {
  autoLoadEntities: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

// Load the corresponding environment config
const envConfig =
  process.env.NODE_ENV === 'production'
    ? ormConfig_production
    : ormConfig_development;

// Final config object
export const OrmConfig: MysqlConnectionOptions = {
  ...ormDbConfig,
  ...envConfig,
};

console.log('OrmConfig', OrmConfig);

export default new DataSource(OrmConfig);
