import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order.listener';
import { PlaygroundController } from './playground.controller';

@Module({
  providers: [OrderCreatedListener],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
