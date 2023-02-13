import { Controller, Get } from '@nestjs/common';

import { configuration, Configuration } from './config.configuration';

@Controller('config')
export class ConfigController {
  @Get()
  getHello(): Configuration {
    return configuration();
  }
}
