import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

class OrderCreatedEvent {
  name: string;
  description: string;
}

@Injectable()
export class OrderCreatedListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);
  }
}
