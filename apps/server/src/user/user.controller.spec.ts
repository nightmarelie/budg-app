import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AppModule } from '../app.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule), AppModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // FIXME: Mock the repository
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
