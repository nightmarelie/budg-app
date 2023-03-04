import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

const COLLECTION_NAME = 'health';

@ApiTags(COLLECTION_NAME)
@Controller(COLLECTION_NAME)
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('api', 'http://localhost:3100/api'), // FIXME: put it to config
      () => this.db.pingCheck('database'), // FIXME: put it to config
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.9 }), // 90% or we can use thresholdBytes: 100 * 1024 * 1024 // 100 MB
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150 MB
    ]);
  }
}
