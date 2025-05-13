// src/shared/entities/recipe.entity.ts
import { RecipeIngredient } from 'src/modules/ingredients/entities/recipe-ingredient.entity';
import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Recipe extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'int' })
  preparationTime: number; // in minutes

  @Column({ type: 'int' })
  cookingTime: number; // in minutes

  @Column({ type: 'int', default: 1 })
  servings: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  equipmentNeeded: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
  )
  ingredients: RecipeIngredient[];

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.recipes)
  menuItem: MenuItem;
}
