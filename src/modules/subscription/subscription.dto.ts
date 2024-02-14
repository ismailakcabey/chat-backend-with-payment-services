import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AccountType } from '../shared/enums/account.type';

export class CreateSubscriptionDto {
  @IsEnum(AccountType)
  readonly paymentType;

  @IsString()
  readonly pricingPlanReferenceCode?: string;

  @IsString()
  readonly identityNumber?: string;

  @IsString()
  readonly cardHolderName?: string;

  @IsString()
  readonly cardNumber?: string;

  @IsString()
  readonly expireYear?: string;

  @IsString()
  readonly expireMonth?: string;

  @IsString()
  readonly cvc?: string;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly surname?: string;

  @IsString()
  readonly email?: string;

  @IsString()
  readonly gsmNumber?: string;

  @IsString()
  readonly contactName?: string;

  @IsString()
  readonly city?: string;

  @IsString()
  readonly district?: string;

  @IsString()
  readonly country?: string;

  @IsString()
  readonly address?: string;

  @IsString()
  readonly zipCode?: string;
}

export class CancelSubscription {
  @IsString()
  readonly subsReferenceCode?: string;
}
