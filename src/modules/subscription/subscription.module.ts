import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from '../database/database.provider';
import { SubscriptionSchema } from './subscription.model';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, ...databaseProviders],
})
export class SubscriptionModule {}
