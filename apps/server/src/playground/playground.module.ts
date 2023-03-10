import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order.listener';

@Module({
  providers: [OrderCreatedListener],
})
export class PlaygroundModule {}
