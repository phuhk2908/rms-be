import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { TableStatus } from 'src/shared/enums/table-status.entity';

@Entity()
export class Table extends BaseEntity {
  @Column()
  number: string;

  @Column()
  capacity: number;

  @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
  status: TableStatus;

  @Column({ type: 'text', nullable: true })
  location: string;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
