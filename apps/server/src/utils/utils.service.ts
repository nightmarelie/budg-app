import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  hashPassword(
    password: string,
    saltOrRounds: string | number = 10,
  ): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
