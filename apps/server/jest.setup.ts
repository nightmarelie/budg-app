import 'reflect-metadata';
import { Connection } from 'typeorm';
import {
  runSeeder,
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';
import CreateUsersSeed from './src/user/user.seed';

let connection: Connection;

beforeAll(async () => {
  connection = await useRefreshDatabase();
  await useSeeding();

  await runSeeder(CreateUsersSeed);
});

afterAll(async () => {
  await connection.dropDatabase();
  await tearDownDatabase();
});
