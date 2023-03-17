import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('playground')
export class PlaygroundController {
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
