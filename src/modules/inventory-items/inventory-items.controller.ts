import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { InventoryItemsService } from './inventory-items.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { CreateSupplierDto } from '../suppliers/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../suppliers/dto/update-supplier.dto';

@Controller('inventory')
export class InventoryItemsController {
  constructor(private readonly inventoryItemsService: InventoryItemsService) {}

  // Inventory Items
  @Post('items')
  createInventoryItem(@Body() createInventoryItemDto: CreateInventoryItemDto) {
    return this.inventoryItemsService.createInventoryItem(
      createInventoryItemDto,
    );
  }

  @Get('items')
  findAllInventoryItems() {
    return this.inventoryItemsService.findAllInventoryItems();
  }

  @Get('items/low-stock')
  findLowStockItems(@Query('threshold') threshold: number = 10) {
    return this.inventoryItemsService.findLowStockItems(Number(threshold));
  }

  @Get('items/expiring-soon')
  findExpiringSoon(@Query('days') days: number = 7) {
    return this.inventoryItemsService.findExpiringSoon(Number(days));
  }

  @Get('items/:id')
  findOneInventoryItem(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryItemsService.findOneInventoryItem(id);
  }

  @Put('items/:id')
  updateInventoryItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryItemDto: UpdateInventoryItemDto,
  ) {
    return this.inventoryItemsService.updateInventoryItem(
      id,
      updateInventoryItemDto,
    );
  }

  @Put('items/:id/adjust/:adjustment')
  adjustInventoryItemQuantity(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('adjustment') adjustment: string,
  ) {
    return this.inventoryItemsService.adjustInventoryItemQuantity(
      id,
      Number(adjustment),
    );
  }

  @Delete('items/:id')
  removeInventoryItem(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryItemsService.removeInventoryItem(id);
  }

  // Suppliers
  @Post('suppliers')
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.inventoryItemsService.createSupplier(createSupplierDto);
  }

  @Get('suppliers')
  findAllSuppliers() {
    return this.inventoryItemsService.findAllSuppliers();
  }

  @Get('suppliers/:id')
  findOneSupplier(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryItemsService.findOneSupplier(id);
  }

  @Put('suppliers/:id')
  updateSupplier(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.inventoryItemsService.updateSupplier(id, updateSupplierDto);
  }

  @Delete('suppliers/:id')
  removeSupplier(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryItemsService.removeSupplier(id);
  }
}
