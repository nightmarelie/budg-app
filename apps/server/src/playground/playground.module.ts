import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order.listener';
import { PlaygroundController } from './playground.controller';
import { PlaygroundService } from './playground.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'playground',
    }),
  ],
  providers: [OrderCreatedListener, PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
