import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  finAll() {
    return this.ordersRepo.find();
  }

  async findOne(id: number) {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: {
        items: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customersRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }
    return this.ordersRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (changes.customerId) {
      const customer = await this.customersRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.ordersRepo.save(order);
  }

  remove(id: number) {
    return this.ordersRepo.delete(id);
  }
}
