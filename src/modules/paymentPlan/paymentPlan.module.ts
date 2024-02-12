import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentPlanSchema } from './paymentPlan.model';
import { databaseProviders } from '../database/database.provider';
import { PaymentPlanService } from './paymentPlan.service';
import { PaymentPlanController } from './paymentPlan.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PaymentPlan', schema: PaymentPlanSchema },
    ]),
  ],
  controllers: [PaymentPlanController],
  providers: [PaymentPlanService, ...databaseProviders],
})
export class PaymentPlanModule {}
