import { IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional() // name alanı opsiyonel
  readonly name?: string;

  @IsString()
  @IsOptional() // description alanı opsiyonel
  readonly description?: string;
}
