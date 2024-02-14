import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISubscription } from './subscription.interface';
import { Subscription } from './subscription.model';
import { CreateSubscriptionDto, CancelSubscription } from './subscription.dto';
import { User } from '../user/user.model';
import { QueryDto } from '../shared/dtos/query.dto';
import { AccountType } from '../shared/enums/account.type';
var Iyzipay = require('iyzipay');

@Injectable()
export class SubscriptionService implements ISubscription {
  constructor(
    @Inject('SubscriptionModelToken')
    private readonly subscriptionModel: Model<Subscription>,
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) {}
  async getSubscription(
    createSubscription: CreateSubscriptionDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }> {
    const addSubs = new this.subscriptionModel(createSubscription);
    const user = await this.userModel
      .find({ _id: userId })
      .limit(1)
      .skip(0)
      .exec();
    const request = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: `${userId}`,
      pricingPlanReferenceCode: createSubscription?.pricingPlanReferenceCode,
      subscriptionInitialStatus: Iyzipay.SUBSCRIPTION_INITIAL_STATUS.ACTIVE,
      paymentCard: {
        cardHolderName: createSubscription?.cardHolderName,
        cardNumber: createSubscription?.cardNumber,
        expireYear: createSubscription?.expireYear,
        expireMonth: createSubscription?.expireMonth,
        cvc: createSubscription?.cvc,
        registerConsumerCard: true,
      },
      customer: {
        name: createSubscription?.name,
        surname: createSubscription?.surname,
        email: user[0]?.email,
        gsmNumber: createSubscription?.gsmNumber,
        identityNumber: createSubscription?.identityNumber,
        billingAddress: {
          contactName: createSubscription?.name,
          city: createSubscription?.city,
          district: createSubscription?.district,
          country: createSubscription?.country,
          address: createSubscription?.address,
          zipCode: createSubscription?.zipCode,
        },
        shippingAddress: {
          contactName: createSubscription?.name,
          city: createSubscription?.city,
          district: createSubscription?.district,
          country: createSubscription?.country,
          address: createSubscription?.address,
          zipCode: createSubscription?.zipCode,
        },
      },
    };
    const data = await this.requestSubs(request);
    addSubs.response = JSON.stringify(data);
    if (data?.status == 'success') {
      addSubs.customerReferenceCode = data?.data?.customerReferenceCode;
      addSubs.subsReferenceCode = data?.data?.referenceCode;
      addSubs.activateStatus = true;
      const updateUser = await this.userModel.findByIdAndUpdate(userId, {
        isPayment: true,
        isPaymentDate: new Date(),
        accountType: createSubscription.paymentType,
      });
      const result = await addSubs.save();
      return {
        status: true,
        data: result,
        message: 'success to add product',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        data: data,
        message: 'failed to add product',
        messageType: 0,
      };
    }
  }
  async requestSubs(request): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(process.env.API_KEY, 'burada');
      const iyzipay = new Iyzipay({
        apiKey: process.env.API_KEY,
        secretKey: process.env.SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com',
      });

      iyzipay.subscription.initialize(request, (err, result) => {
        if (result) {
          Logger.log(result);
          resolve(result);
        } else {
          Logger.error(err);
          reject(err);
        }
      });
    });
  }
  async cancelSubscription(
    cancelSubscription: CancelSubscription,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }> {
    const query = {
      where: {
        subsReferenceCode: cancelSubscription?.subsReferenceCode,
      },
    };
    const canceledSubs = await this.subscriptionModel.find(query?.where);
    const cancelRequest = {
      subscriptionReferenceCode: cancelSubscription?.subsReferenceCode,
    };
    const data = await this.requestSubs(cancelRequest);
    if (data?.status == 'success') {
      const subs = await this.subscriptionModel.findByIdAndUpdate(
        canceledSubs[0]?._id,
        {
          cancelresponse: JSON.stringify(data),
          activateStatus: false,
        },
      );
      const updateUser = await this.userModel.findByIdAndUpdate(userId, {
        isPayment: false,
        isPaymentDate: new Date(),
        accountType: AccountType.MONTH,
      });
      return {
        status: true,
        data: subs,
        message: 'success to add subs',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        data: data,
        message: 'failed to add subs',
        messageType: 0,
      };
    }
  }

  async findSubs(query: QueryDto): Promise<{
    status?: boolean;
    data?: Subscription[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    try {
      const { where, sort, skip, limit, include } = query;
      const payments = await this.subscriptionModel
        .find(where)
        .populate(include)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();
      const count = await this.subscriptionModel.countDocuments(where).exec();
      return {
        status: true,
        data: payments,
        message: 'success to find subs',
        messageType: 0,
        count: count,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to find subs',
        messageType: 0,
      };
    }
  }

  async findByIdSubs(id: string): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }> {
    try {
      const sub = await this.subscriptionModel.findById(id).exec();
      if (sub) {
        return {
          status: true,
          data: sub,
          message: 'success to find sub',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'payment not subs',
          messageType: 0,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'failed to find by id subs',
        messageType: 0,
      };
    }
  }
}
