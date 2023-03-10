import { IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @IsNotEmpty()
  accessToken: string;
  @IsNotEmpty()
  expiresIn: string;
  // TODO: Add refreshToken: string, expiresIn: number and other fields
}
