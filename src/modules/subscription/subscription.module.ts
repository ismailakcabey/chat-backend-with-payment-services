import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from '../database/database.provider';
import { SubscriptionSchema } from './subscription.model';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentInformationSchema } from './paymentInformation..model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'PaymentInformation', schema: PaymentInformationSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, ...databaseProviders],
})
export class SubscriptionModule {}
