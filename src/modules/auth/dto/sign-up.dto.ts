import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './sign-in.dto';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
