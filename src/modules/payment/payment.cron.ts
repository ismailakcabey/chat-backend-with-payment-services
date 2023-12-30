import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { AccountType } from '../shared/enums/account.type';

@Injectable()
export class PaymentCron {
  constructor(
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async handlePaymentCronMonth() {
    console.log('cron started');
    try {
      const currentDate = new Date();
      const minPaymentDate = new Date();
      minPaymentDate.setDate(currentDate.getDate() - 30);
      const maxPaymentDate = new Date();
      maxPaymentDate.setDate(currentDate.getDate() - 31);
      console.log('minPaymentDate', minPaymentDate);
      console.log('maxPaymentDate', maxPaymentDate);
      let query = {
        isActive: true,
        isPayment: true,
        accountType: AccountType.MONTH,
        isPaymentDate: {
          $gte: minPaymentDate,
          $lte: maxPaymentDate,
        },
      };
      console.log(query);
      const users = await this.userModel.find(query);
      users?.map(async (user: User, key: number) => {
        await this.userModel.findByIdAndUpdate(user?._id, {
          isPayment: false,
          isActive: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async handlePaymentCronYear() {
    console.log('cron started');
    try {
      const currentDate = new Date();
      const minPaymentDate = new Date();
      minPaymentDate.setDate(currentDate.getDate() - 364);
      const maxPaymentDate = new Date();
      maxPaymentDate.setDate(currentDate.getDate() - 365);
      console.log('minPaymentDate', minPaymentDate);
      console.log('maxPaymentDate', maxPaymentDate);
      let query = {
        isActive: true,
        isPayment: true,
        accountType: AccountType.YEAR,
        isPaymentDate: {
          $gte: minPaymentDate,
          $lte: maxPaymentDate,
        },
      };
      console.log(query);
      const users = await this.userModel.find(query);
      users?.map(async (user: User, key: number) => {
        await this.userModel.findByIdAndUpdate(user?._id, {
          isPayment: false,
          isActive: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_7PM)
  async handlePaymentCron3Month() {
    console.log('cron started');
    try {
      const currentDate = new Date();
      const minPaymentDate = new Date();
      minPaymentDate.setDate(currentDate.getDate() - 90);
      const maxPaymentDate = new Date();
      maxPaymentDate.setDate(currentDate.getDate() - 91);
      console.log('minPaymentDate', minPaymentDate);
      console.log('maxPaymentDate', maxPaymentDate);
      let query = {
        isActive: true,
        isPayment: true,
        accountType: AccountType.THREEMONTH,
        isPaymentDate: {
          $gte: minPaymentDate,
          $lte: maxPaymentDate,
        },
      };
      console.log(query);
      const users = await this.userModel.find(query);
      users?.map(async (user: User, key: number) => {
        await this.userModel.findByIdAndUpdate(user?._id, {
          isPayment: false,
          isActive: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
