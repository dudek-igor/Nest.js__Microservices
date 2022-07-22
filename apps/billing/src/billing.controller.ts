import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateOrderDto } from '@app/interfaces';
import { RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(
    @Payload() data: CreateOrderDto,
    @Ctx() context: RmqContext,
  ) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
