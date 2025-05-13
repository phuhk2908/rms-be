import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

@Controller('menu')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  // Menu Items
  @Post('items')
  createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.createMenuItem(createMenuItemDto);
  }

  @Get('items')
  findAllMenuItems() {
    return this.menuItemsService.findAllMenuItems();
  }

  @Get('items/active')
  findActiveMenuItems() {
    return this.menuItemsService.findActiveMenuItems();
  }

  @Get('items/:id')
  findOneMenuItem(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuItemsService.findOneMenuItem(id);
  }

  @Put('items/:id')
  updateMenuItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.updateMenuItem(id, updateMenuItemDto);
  }

  @Delete('items/:id')
  removeMenuItem(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuItemsService.removeMenuItem(id);
  }

  // Menu Categories
  @Post('categories')
  createMenuCategory(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuItemsService.createMenuCategory(createMenuCategoryDto);
  }

  @Get('categories')
  findAllMenuCategories() {
    return this.menuItemsService.findAllMenuCategories();
  }

  @Get('categories/:id')
  findOneMenuCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuItemsService.findOneMenuCategory(id);
  }

  @Put('categories/:id')
  updateMenuCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuItemsService.updateMenuCategory(id, updateMenuCategoryDto);
  }

  @Delete('categories/:id')
  removeMenuCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuItemsService.removeMenuCategory(id);
  }
}
