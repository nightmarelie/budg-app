import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './DTOs';
import { LocalAuthGuard } from './guards';

const COLLECTION_NAME = 'auth';

@ApiTags(COLLECTION_NAME)
@Controller(COLLECTION_NAME)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
