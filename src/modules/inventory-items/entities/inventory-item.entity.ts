import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';

import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';

import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import { InventoryItemCategory } from 'src/shared/enums/inventory-item-category.enum';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';

@Entity()
export class InventoryItem extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: InventoryItemCategory })
  category: InventoryItemCategory;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column('decimal', { precision: 10, scale: 2 })
  costPerUnit: number;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastRestocked: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  minimumQuantity: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.items)
  supplier: Supplier;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.inventoryItems)
  menuItem: MenuItem;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.inventoryItems)
  ingredient: Ingredient;
}
