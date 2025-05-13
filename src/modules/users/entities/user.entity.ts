import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Order, (order) => order.waiter)
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.createdBy)
  reservations: Reservation[];
}
