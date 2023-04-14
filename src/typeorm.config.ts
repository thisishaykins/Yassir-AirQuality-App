import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  synchronize: true,
  //   cli: {
  //     migrationsDir: 'src/migration',
  //   },
};

export = typeOrmConfig;
