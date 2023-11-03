import { Inject, Injectable } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { PaymentCartInfoDto } from './payment.dto';
import { Payment } from './payment.model';
import { Model } from 'mongoose';
import { User } from '../user/user.model';

@Injectable()
export class PaymentService implements IPayment {
  constructor(
    @Inject('PaymentModelToken')
    private readonly paymentModel: Model<Payment>,
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) {}

  async getPayment(
    createPayment: PaymentCartInfoDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }> {
    try {
      let payment = {
        userId: userId,
        status: true,
        accountType: createPayment.paymentType,
      };
      const addPayment = await new this.paymentModel(payment);
      await setTimeout(() => {
        console.log('ödeme isteği atılıyor');
      }, 1000);
      const result = await addPayment.save();
      if(payment?.status){
        const updateUser = await this.userModel.findByIdAndUpdate(userId,{isPayment:true,isPaymentDate:new Date,accountType:createPayment.paymentType})
      }
      return {
        status: true,
        data: result,
        message: 'success to add payment',
        messageType: 0,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to add payment',
        messageType: 0,
      };
    }
  }
  async returnPayment(
    createPayment: PaymentCartInfoDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }> {
    try {
      let payment = {
        userId: userId,
        status: true,
        accountType: createPayment.paymentType,
        isReturned: true,
      };
      const addPayment = await new this.paymentModel(payment);
      setTimeout(() => {
        console.log('ödeme isteği atılıyor');
      }, 1000);
      const result = await addPayment.save();
      return {
        status: true,
        data: result,
        message: 'success to add payment',
        messageType: 0,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to add payment',
        messageType: 0,
      };
    }
  }
  async findPayment(
    query: QueryDto,
  ): Promise<{
    status?: boolean;
    data?: Payment[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    try {
        const { where, skip, limit, include } = query;
        const payments = await this.paymentModel
          .find(where)
          .populate(include)
          .limit(limit)
          .skip(skip)
          .exec();
        const count = await this.paymentModel.countDocuments(where).exec();
        return {
          status: true,
          data: payments,
          message: 'success to find payments',
          messageType: 0,
          count: count,
        };
      } catch (error) {
        console.log(error);
        return {
          status: false,
          message: 'failed to find payments',
          messageType: 0,
        };
      }
  }
  async findByIdPayment(
    id: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }> {
    try {
        const payment = await this.paymentModel.findById(id).exec();
        if (payment) {
          return {
            status: true,
            data: payment,
            message: 'success to find payment',
            messageType: 0,
          };
        } else {
          return {
            status: false,
            message: 'payment not found',
            messageType: 0,
          };
        }
      } catch (error) {
        return {
          status: false,
          message: 'failed to find by id payment',
          messageType: 0,
        };
      }
  }
}
