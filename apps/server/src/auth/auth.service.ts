import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto, LoginDto } from './DTOs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: LoginDto['username'],
    password: LoginDto['password'],
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findOneByUsername(username);

    // TODO: Hash password by bcrypt
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
