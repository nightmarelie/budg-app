import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a hashed password', async () => {
    const hashedPassword = await service.hashPassword('password');

    expect(hashedPassword).not.toBe('password');
  });

  it('should return true if the password is correct', async () => {
    const hashedPassword = await service.hashPassword('password');

    expect(await service.comparePassword('password', hashedPassword)).toBe(
      true,
    );
  });
});
