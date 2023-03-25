import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class PlaygroundService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCachedValue(key: string): Promise<string> {
    return this.cacheManager.get(key);
  }

  async setCachedValue(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }
}
