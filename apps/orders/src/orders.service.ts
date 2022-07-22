import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDto } from '@app/interfaces';
import { BILLING_SERVICE } from '../constans/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  getOrders() {
    return this.ordersRepository.find();
  }

  async createOrder(request: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', { request }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      console.log(err);

      await session.abortTransaction();
      throw err;
    }
  }
}
