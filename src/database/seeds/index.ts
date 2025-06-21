import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { getDataSourceOptions } from '../typeorm.config';
import { seedLocal } from './local.seed';
import { seedProduction } from './prod.seed';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
});

const dataSource = new DataSource(getDataSourceOptions(process.env));

async function runSeed() {
  await dataSource.initialize();

  const env = process.env.NODE_ENV;

  if (env === 'local') {
    await seedLocal(dataSource);
  } else if (env === 'production') {
    await seedProduction(dataSource);
  } else {
    console.log(`No seed defined for NODE_ENV="${env}"`);
  }

  await dataSource.destroy();
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
