import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AddIngredientToRecipeDto } from './dto/add-ingredient-to-recipe.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  
  @Public()
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipesService.findOne(id);
  }

  @Public()
  @Get('menu-item/:menuItemId')
  findByMenuItem(@Param('menuItemId', ParseUUIDPipe) menuItemId: string) {
    return this.recipesService.findByMenuItem(menuItemId);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipesService.remove(id);
  }

  @Public()
  @Post(':id/ingredients')
  addIngredient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addIngredientDto: AddIngredientToRecipeDto,
  ) {
    return this.recipesService.addIngredient(id, addIngredientDto);
  }

  @Delete(':recipeId/ingredients/:ingredientId')
  removeIngredient(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ) {
    return this.recipesService.removeIngredient(recipeId, ingredientId);
  }

  @Public()
  @Get(':id/cost')
  calculateCost(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipesService.calculateCost(id);
  }
}
