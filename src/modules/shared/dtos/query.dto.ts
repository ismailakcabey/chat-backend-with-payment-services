import { IsArray, IsInt, IsObject, IsOptional } from 'class-validator';

export class QueryDto {
  @IsObject()
  readonly where?: object;

  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @IsInt()
  @IsOptional()
  readonly skip?: number;

  @IsArray()
  @IsOptional()
  readonly include?: string[];

  @IsArray()
  @IsOptional()
  readonly sort?: any;
}
