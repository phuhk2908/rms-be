import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { MenuItemsModule } from '../menu-items/menu-items.module';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { RecipeIngredient } from '../ingredients/entities/recipe-ingredient.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import { Recipe } from './entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient, MenuItem]),
    IngredientsModule,
    MenuItemsModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
