import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth';

import { configuration, Configuration } from './config.configuration';

@Controller('config')
export class ConfigController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getConfiguration(): Configuration {
    return configuration();
  }
}
