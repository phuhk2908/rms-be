import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Table } from 'src/modules/tables/entities/table.entity';
import { ReservationStatus } from 'src/shared/enums/reservation-status.enum';

@Entity()
export class Reservation extends BaseEntity {
  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column()
  customerEmail: string;

  @Column()
  partySize: number;

  @Column({ type: 'timestamp' })
  reservationTime: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.CONFIRMED,
  })
  status: ReservationStatus;

  @Column({ type: 'text', nullable: true })
  specialRequests: string;

  @ManyToOne(() => User, (user) => user.reservations)
  createdBy: User;

  @ManyToOne(() => Table, (table) => table.reservations)
  table: Table;
}
