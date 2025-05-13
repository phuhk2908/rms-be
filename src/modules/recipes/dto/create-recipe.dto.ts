import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateRecipeDto {
  @IsUUID()
  menuItemId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsNumber()
  preparationTime: number;

  @IsNumber()
  cookingTime: number;

  @IsInt()
  @IsOptional()
  servings?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  equipmentNeeded?: string;
}
