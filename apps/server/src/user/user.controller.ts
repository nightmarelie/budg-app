import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const COLLECTION_NAME = 'users';

@UseGuards(JwtAuthGuard)
@ApiTags(COLLECTION_NAME)
@ApiBearerAuth()
@Controller(COLLECTION_NAME)
@UseInterceptors(ClassSerializerInterceptor) // TODO: Maybe it's better to use it globally?
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
