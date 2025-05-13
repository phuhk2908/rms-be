import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientsService } from './ingredients.service';
import { InventoryItem } from '../inventory-items/entities/inventory-item.entity';
import { Ingredient } from './entities/ingredient.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { InventoryItemsModule } from '../inventory-items/inventory-items.module';
import { IngredientsController } from './ingredients.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, RecipeIngredient, InventoryItem]),
    forwardRef(() => InventoryItemsModule),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
