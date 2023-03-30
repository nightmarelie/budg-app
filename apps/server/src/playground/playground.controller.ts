import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Sse } from '@nestjs/common';
import { Queue } from 'bull';
import { interval, map, Observable } from 'rxjs';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('playground')
export class PlaygroundController {
  constructor(
    @InjectQueue('playground') private readonly playgroundQueue: Queue,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } })));
  }

  @Post('task')
  async task() {
    await this.playgroundQueue.add('task', { hello: 'world' });

    return { message: 'Task added' };
  }
}
