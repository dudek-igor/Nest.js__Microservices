import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrders() {
    return this.ordersRepository.find();
  }

  async createOrder(request: CreateOrderDto) {
    return this.ordersRepository.create(request);
  }
}
