const databaseConfig = () => {
  return {
    db: {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: process.env.TYPEORM_ENTITIES,
      migrations: process.env.TYPEORM_MIGRATIONS,
      synchronize: false,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
  };
};

export default databaseConfig;
