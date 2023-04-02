import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Cron } from '@nestjs/schedule';
import { LoggerService } from '../logger';

@Injectable()
export class PlaygroundService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly logger: LoggerService,
  ) {}

  async getValue(key: string): Promise<string> {
    return this.cacheManager.get(key);
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async deleteValue(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.reset();
  }

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
