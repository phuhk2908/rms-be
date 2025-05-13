import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderStatus } from 'src/shared/enums/order-status.enum';

import { Table } from 'src/modules/tables/entities/table.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.orders)
  waiter: User;

  @ManyToOne(() => Table, (table) => table.orders)
  table: Table;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
