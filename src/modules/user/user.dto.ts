import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { Language, Role } from './user.enum';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  readonly isKvkk: boolean = true;

  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsEnum(Language)
  @IsOptional()
  language: Language = Language.EN;

  @IsMongoId()
  @IsOptional()
  readonly companyId?: mongoose.Schema.Types.ObjectId;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsEnum(Language)
  @IsOptional()
  language: Language = Language.EN;

  @IsMongoId()
  @IsOptional()
  readonly companyId?: mongoose.Schema.Types.ObjectId;
}
