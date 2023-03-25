import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order.listener';
import { PlaygroundController } from './playground.controller';
import { PlaygroundService } from './playground.service';

@Module({
  providers: [OrderCreatedListener, PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
