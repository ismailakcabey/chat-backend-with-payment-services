import { IsBoolean, IsEnum, IsInt, IsMongoId, IsString } from 'class-validator';
import { AccountType } from '../shared/enums/account.type';
import mongoose from 'mongoose';

export class PaymentCartInfoDto {
  @IsString()
  readonly cartHolderName: string;

  @IsString()
  readonly cartNumber: string;

  @IsString()
  readonly cartCvv: string;

  @IsString()
  readonly cartMonth: string;

  @IsString()
  readonly cartYear: string;

  @IsEnum(AccountType)
  readonly paymentType;
}

export class RefundCartInfoDto {
  @IsString()
  conversationId: string;
}
