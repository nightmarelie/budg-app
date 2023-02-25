import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto, LoginDto } from './DTOs';
import { UtilsService } from 'utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    username: LoginDto['username'],
    password: LoginDto['password'],
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findOneByUsername(username);
    const isPasswordValid = await this.utilsService.comparePassword(
      password,
      user.password,
    );

    if (user && isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.uuid };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get('jwt.signOptions.expiresIn'),
    };
  }
}
