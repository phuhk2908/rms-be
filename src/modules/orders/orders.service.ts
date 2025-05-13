import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { OrderItemStatus } from 'src/shared/enums/order-item-status.enum';
import { OrderStatus } from 'src/shared/enums/order-status.enum';
import { PaymentMethod } from 'src/shared/enums/payment-method.enum';
import { TableStatus } from 'src/shared/enums/table-status.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import { User } from '../users/entities/user.entity';
import { PaymentsService } from '../payments/payments.service';
import { Table } from '../tables/entities/table.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    private readonly paymentService: PaymentsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const table = await this.tableRepository.findOne({
      where: { id: createOrderDto.tableId },
    });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    if (table.status !== TableStatus.AVAILABLE) {
      throw new BadRequestException('Table is not available');
    }

    const order = this.orderRepository.create({
      table,
      waiter: user,
      status: OrderStatus.PENDING,
      notes: createOrderDto.notes,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Validate all menu items exist
    const menuItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const menuItem = await this.menuItemRepository.findOne({
          where: { id: item.menuItemId },
        });
        if (!menuItem) {
          throw new NotFoundException(
            `Menu item with ID ${item.menuItemId} not found`,
          );
        }
        return menuItem;
      }),
    );

    const orderItems = createOrderDto.items.map((item, index) =>
      this.orderItemRepository.create({
        menuItem: menuItems[index],
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
        order: savedOrder,
        status: OrderItemStatus.PENDING,
      }),
    );

    await this.orderItemRepository.save(orderItems);

    // Update table status
    table.status = TableStatus.OCCUPIED;
    await this.tableRepository.save(table);

    // Send to kitchen display
    const fullOrder = await this.findOne(savedOrder.id);
    // this.kitchenDisplayService.sendOrderToKitchen(fullOrder);

    return fullOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.menuItem', 'table', 'waiter', 'payments'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.menuItem', 'table', 'waiter', 'payments'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByTable(tableId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { table: { id: tableId } },
      relations: ['items', 'items.menuItem', 'waiter', 'payments'],
    });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status },
      relations: ['items', 'items.menuItem', 'table', 'waiter'],
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    return this.orderRepository.save({ ...order, ...updateOrderDto });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;

    // If order is completed, free up the table
    if (status === OrderStatus.COMPLETED) {
      const table = await this.tableRepository.findOne({
        where: { id: order.table.id },
      });
      if (table) {
        table.status = TableStatus.AVAILABLE;
        await this.tableRepository.save(table);
      }
    }

    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async updateOrderItemStatus(
    orderId: string,
    itemId: string,
    status: OrderItemStatus,
  ): Promise<OrderItem> {
    const order = await this.findOne(orderId);
    const item = order.items.find((i) => i.id === itemId);
    if (!item) {
      throw new NotFoundException('Order item not found');
    }
    item.status = status;
    return this.orderItemRepository.save(item);
  }

  async calculateTotal(id: string): Promise<number> {
    const order = await this.findOne(id);
    return order.items.reduce(
      (total, item) => total + item.quantity * item.menuItem.price,
      0,
    );
  }

  async addPaymentToOrder(
    orderId: string,
    paymentMethod: PaymentMethod,
    amount: number,
  ): Promise<Order> {
    await this.findOne(orderId);
    await this.paymentService.create({
      orderId,
      method: paymentMethod,
      amount,
    });
    return this.findOne(orderId);
  }
}
