import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const BCRYPT_ROUNDS_NUM = 10;

@Injectable()
export class UtilsService {
  static hashPassword(
    password: string,
    saltOrRounds: string | number = BCRYPT_ROUNDS_NUM,
  ): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  static flattenObject(obj: Record<string, any>): Record<string, any> {
    function flat(res, key, val, pre = '') {
      const prefix = [pre, key].filter((v) => v).join('.');
      return typeof val === 'object'
        ? Object.keys(val).reduce(
            (prev, curr) => flat(prev, curr, val[curr], prefix),
            res,
          )
        : Object.assign(res, { [prefix]: val });
    }

    return Object.keys(obj).reduce(
      (prev, curr) => flat(prev, curr, obj[curr]),
      {},
    );
  }

  hashPassword(
    password: string,
    saltOrRounds: string | number = BCRYPT_ROUNDS_NUM,
  ): Promise<string> {
    return UtilsService.hashPassword(password, saltOrRounds);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
