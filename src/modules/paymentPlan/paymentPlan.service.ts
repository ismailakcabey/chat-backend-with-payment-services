import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPaymentPlan } from './paymentPlan.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { CreatePaymentPlanDto, UpdatePaymentPlanDto } from './paymentPlan.dto';
import { PaymentPlan } from './paymentPlan.model';
import { Model } from 'mongoose';
var Iyzipay = require('iyzipay');

@Injectable()
export class PaymentPlanService implements IPaymentPlan {
  constructor(
    @Inject('PaymentPlanModelToken')
    private readonly paymentPlanModel: Model<PaymentPlan>,
  ) {}
  async createPaymentPlan(createPaymentPlan: CreatePaymentPlanDto): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }> {
    try {
      const addPaymentPlan = new this.paymentPlanModel(createPaymentPlan);
      const request = {
        locale: Iyzipay.LOCALE.EN,
        conversationId: `${createPaymentPlan?.name}-${createPaymentPlan?.description}-${createPaymentPlan?.price}`,
        price: createPaymentPlan?.price,
        name: createPaymentPlan?.name,
        description: createPaymentPlan?.description,
        currencyCode: Iyzipay.CURRENCY.USD,
        paymentInterval: createPaymentPlan?.paymentInterval,
        paymentIntervalCount: createPaymentPlan?.paymentIntervalCount,
        planPaymentType: Iyzipay.PLAN_PAYMENT_TYPE.RECURRING,
      };

      const data = await this.createSubsPlan(request);
      addPaymentPlan.response = JSON.stringify(data);
      if (data?.status == 'success') {
        addPaymentPlan.paymentPlanReferenceCode = data?.referenceCode;
        const result = await addPaymentPlan.save();
        return {
          status: true,
          data: result,
          message: 'success to add paymentPlan',
          messageType: 0,
        };
      }
      return {
        status: true,
        data: undefined,
        message: 'success to add paymentPlan',
        messageType: 0,
      };
    } catch (error) {
      return {
        status: false,
        message: 'failed to add paymentPlan',
        messageType: 0,
      };
    }
  }
  async createSubsPlan(request): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(process.env.API_KEY, 'burada');
      const iyzipay = new Iyzipay({
        apiKey: process.env.API_KEY,
        secretKey: process.env.SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com',
      });

      iyzipay.subscriptionPricingPlan.create(request, (err, result) => {
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
  async updatePaymentPlan(
    id: string,
    updatePaymentPlan: UpdatePaymentPlanDto,
  ): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }> {
    const paymentPlan = await this.paymentPlanModel.findByIdAndUpdate(
      id,
      updatePaymentPlan,
    );
    if (paymentPlan) {
      return {
        status: true,
        data: paymentPlan,
        message: 'success to update paymentPlan',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'paymentPlan not found',
        messageType: 0,
      };
    }
  }
  async deletePaymentPlan(id: string): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }> {
    const paymentPlan = await this.paymentPlanModel.findByIdAndDelete(id);
    if (paymentPlan) {
      return {
        status: true,
        data: paymentPlan,
        message: 'success to delete paymentPlan',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'paymentPlan not found',
        messageType: 0,
      };
    }
  }
  async findByIdPaymentPlan(id: string): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }> {
    try {
      const paymentPlan = await this.paymentPlanModel.findById(id).exec();
      if (paymentPlan) {
        return {
          status: true,
          data: paymentPlan,
          message: 'success to find paymentPlan',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'paymentPlan not found',
          messageType: 0,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'failed to find by id paymentPlan',
        messageType: 0,
      };
    }
  }
  async findPaymentPlan(query: QueryDto): Promise<{
    status?: boolean;
    data?: PaymentPlan[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    const { where, skip, limit, include, sort } = query;
    try {
      const companies = await this.paymentPlanModel
        .find(where)
        .populate(include)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();
      const count = await this.paymentPlanModel.countDocuments(where).exec();
      return {
        status: true,
        data: companies,
        message: 'success to find companies',
        messageType: 0,
        count: count,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to find companies',
        messageType: 0,
      };
    }
  }
}
