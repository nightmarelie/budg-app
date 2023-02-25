import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { runSeeder } from 'typeorm-seeding';
import { AppModule } from '../app.module';
import { User } from './user.entity';
import CreateUsersSeed from './user.seed';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const testUser = {
    uuid: '00000000-0000-0000-0000-000000000002',
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'Test',
    username: 'test',
    password: 'password',
    isActive: true,
  };

  beforeAll(async () => {
    await runSeeder(CreateUsersSeed);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user', async () => {
    const testUuid = '00000000-0000-0000-0000-000000000001';
    const user = await service.findOne(testUuid);

    expect(user).toBeDefined();
    expect(user.uuid).toEqual(testUuid);
    expect(user.username).toEqual('night');
    expect(user.email).toEqual('night@test.com');
    expect(user.isActive).toEqual(true);
  });

  it('should return a user by username', async () => {
    const testUsername = 'night';
    const user = await service.findOneByUsername(testUsername);

    expect(user).toBeDefined();
    expect(user.username).toEqual('night');
    expect(user.email).toEqual('night@test.com');
    expect(user.isActive).toEqual(true);
  });

  it('should return all users', async () => {
    const users = await service.findAll();

    expect(users).toBeDefined();
    expect(users.length).toEqual(11);
  });

  it('should create a user', async () => {
    const user = await service.create(new User(testUser));

    expect(user).toBeDefined();
    expect(user.uuid).toEqual(testUser.uuid);
    expect(user.username).toEqual(testUser.username);
    expect(user.email).toEqual(testUser.email);
    expect(user.isActive).toEqual(testUser.isActive);

    // Clean up
    await service.remove(user.uuid);
  });

  it('should remove a user', async () => {
    const user = await service.create(new User(testUser));
    const result = await service.remove(user.uuid);

    expect(result).toBeDefined();
    expect(result.affected).toEqual(1);
  });
});
