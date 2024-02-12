import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentPlanDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly productReferenceCode?: string;

  @IsNumber()
  readonly price?: number;

  @IsString()
  readonly paymentInterval?: string;

  @IsNumber()
  readonly paymentIntervalCount?: number;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class UpdatePaymentPlanDto {
  @IsString()
  @IsOptional() // name alanı opsiyonel
  readonly name?: string;

  @IsString()
  @IsOptional() // description alanı opsiyonel
  readonly description?: string;
}
