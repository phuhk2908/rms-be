import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { MenuCategory } from './menu-category.entity';
import { OrderItem } from 'src/modules/orders/entities/order-item.entity';
import { Recipe } from 'src/modules/recipes/entities/recipe.entity';
import { InventoryItem } from 'src/modules/inventory-items/entities/inventory-item.entity';

@Entity()
export class MenuItem extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  preparationTime: number;

  @ManyToOne(() => MenuCategory, (category) => category.items)
  category: MenuCategory;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menuItem)
  orderItems: OrderItem[];

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.menuItem)
  inventoryItems: InventoryItem[];

  @OneToMany(() => Recipe, (recipe) => recipe.menuItem)
  recipes: Recipe[];
}
