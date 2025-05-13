import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { InventoryItem } from 'src/modules/inventory-items/entities/inventory-item.entity';

@Entity()
export class Supplier extends BaseEntity {
  @Column()
  name: string;

  @Column()
  contactPerson: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany(() => InventoryItem, (item) => item.supplier)
  items: InventoryItem[];
}
