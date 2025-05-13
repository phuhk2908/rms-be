import { BaseEntity } from 'src/shared/entities/base.entity';
import { IngredientCategory } from 'src/shared/enums/ingredient-category.enum';
import { Entity, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { InventoryItem } from 'src/modules/inventory-items/entities/inventory-item.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: IngredientCategory })
  category: IngredientCategory;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  unit: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  averageCost: number;

  @Column({ nullable: true })
  allergenInfo: string;

  @Column({ nullable: true })
  nutritionalInfo: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
  )
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.ingredient)
  inventoryItems: InventoryItem[];
}
