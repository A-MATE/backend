import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../users/entities/user.entity';

const entities = [Organization, Team, User];

export const getTypeOrmModuleOptions = (
  env: NodeJS.ProcessEnv,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT as string, 10),
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD || '',
  database: env.DATABASE_NAME,
  entities,
  migrations: ['dist/database/migrations/*.js'],
  synchronize: env.NODE_ENV === 'local',
  migrationsRun: true,
  ssl: getSSLConfig(env),
});

export const getDataSourceOptions = (
  env: NodeJS.ProcessEnv,
): DataSourceOptions => ({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT as string, 10),
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD || '',
  database: env.DATABASE_NAME,
  entities,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: getSSLConfig(env),
});

const getSSLConfig = (env: NodeJS.ProcessEnv) => {
  if (env.DATABASE_SSL === 'false') {
    return false;
  }
  if (env.NODE_ENV === 'local') {
    return false;
  }
  return { rejectUnauthorized: false };
};
