import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../user.entity';

export class UserDto extends OmitType(User, ['password']) {
  @Exclude()
  @ApiHideProperty()
  password: string;
}
