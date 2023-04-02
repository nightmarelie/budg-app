import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order.listener';
import { PlaygroundController } from './playground.controller';
import { PlaygroundProcessor } from './playground.processor';
import { PlaygroundService } from './playground.service';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'playground', // TODO: move to the separate config module
    }),
    LoggerModule,
  ],
  controllers: [PlaygroundController],
  providers: [OrderCreatedListener, PlaygroundService, PlaygroundProcessor],
})
export class PlaygroundModule {}
