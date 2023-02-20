import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth';
import { configuration, Configuration } from './config.configuration';

const COLLECTION_NAME = 'config';

@UseGuards(JwtAuthGuard)
@ApiTags(COLLECTION_NAME)
@ApiBearerAuth()
@Controller(COLLECTION_NAME)
export class ConfigController {
  @Get()
  getConfiguration(): Configuration {
    return configuration();
  }
}
