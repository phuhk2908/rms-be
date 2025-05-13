import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { MenuCategory } from './entities/menu-category.entity';

import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  // Menu Item methods
  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItem> {
    const category = await this.menuCategoryRepository.findOne({
      where: { id: createMenuItemDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const menuItem = this.menuItemRepository.create({
      ...createMenuItemDto,
      category,
    });
    return this.menuItemRepository.save(menuItem);
  }

  async findAllMenuItems(): Promise<MenuItem[]> {
    return this.menuItemRepository.find({ relations: ['category'] });
  }

  async findActiveMenuItems(): Promise<MenuItem[]> {
    return this.menuItemRepository.find({
      where: { isActive: true },
      relations: ['category'],
    });
  }

  async findOneMenuItem(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    return menuItem;
  }

  async updateMenuItem(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.findOneMenuItem(id);
    if (updateMenuItemDto.categoryId) {
      const category = await this.menuCategoryRepository.findOne({
        where: { id: updateMenuItemDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      menuItem.category = category;
    }
    return this.menuItemRepository.save({
      ...menuItem,
      ...updateMenuItemDto,
    });
  }

  async removeMenuItem(id: string): Promise<void> {
    const menuItem = await this.findOneMenuItem(id);
    await this.menuItemRepository.remove(menuItem);
  }

  // Menu Category methods
  async createMenuCategory(
    createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    const category = this.menuCategoryRepository.create(createMenuCategoryDto);
    return this.menuCategoryRepository.save(category);
  }

  async findAllMenuCategories(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find({ relations: ['items'] });
  }

  async findOneMenuCategory(id: string): Promise<MenuCategory> {
    const category = await this.menuCategoryRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!category) {
      throw new NotFoundException('Menu category not found');
    }
    return category;
  }

  async updateMenuCategory(
    id: string,
    updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    const category = await this.findOneMenuCategory(id);
    return this.menuCategoryRepository.save({
      ...category,
      ...updateMenuCategoryDto,
    });
  }

  async removeMenuCategory(id: string): Promise<void> {
    const category = await this.findOneMenuCategory(id);
    await this.menuCategoryRepository.remove(category);
  }
}
