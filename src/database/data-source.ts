import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { getDataSourceOptions } from './typeorm.config';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
});

export default new DataSource(getDataSourceOptions(process.env));
