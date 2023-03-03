import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

const COLLECTION_NAME = 'health';

@ApiTags(COLLECTION_NAME)
@Controller(COLLECTION_NAME)
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('api', 'http://localhost:3100/api'), // FIXME: put it to config
      () => this.db.pingCheck('database'), // FIXME: put it to config
    ]);
  }
}
