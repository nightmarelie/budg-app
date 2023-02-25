import 'reflect-metadata';
import { Connection } from 'typeorm';
import {
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';

let connection: Connection;

beforeAll(async () => {
  connection = await useRefreshDatabase();
  await useSeeding();
});

afterAll(async () => {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }

  await tearDownDatabase();
});
