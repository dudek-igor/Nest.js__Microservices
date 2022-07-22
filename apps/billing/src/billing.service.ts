import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '@app/interfaces';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: CreateOrderDto) {
    this.logger.log('Billing...', data);
  }
}
