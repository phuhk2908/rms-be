import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Recipe } from 'src/modules/recipes/entities/recipe.entity';

@Entity()
export class RecipeIngredient extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ nullable: true })
  preparationNotes: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients)
  ingredient: Ingredient;
}
