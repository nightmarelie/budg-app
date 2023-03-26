import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PlaygroundService } from './playground.service';

describe('PlaygroundService', () => {
  let service: PlaygroundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PlaygroundService],
    }).compile();

    service = module.get<PlaygroundService>(PlaygroundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
