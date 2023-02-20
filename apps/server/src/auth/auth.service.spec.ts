import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user';
import { AuthService } from './auth.service';

// TODO: add more tests based on https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt/src/auth/auth.service.spec.ts
// TODO: I need mock db for this
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UserModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
