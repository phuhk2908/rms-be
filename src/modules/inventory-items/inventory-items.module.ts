import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { InventoryItemsController } from './inventory-items.controller';
import { InventoryItemsService } from './inventory-items.service';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryItem, Ingredient, Supplier]),
    forwardRef(() => IngredientsModule),
    forwardRef(() => SuppliersModule),
  ],
  controllers: [InventoryItemsController],
  providers: [InventoryItemsService],
  exports: [InventoryItemsService],
})
export class InventoryItemsModule {}
