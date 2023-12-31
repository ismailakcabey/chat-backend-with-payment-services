import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { PaymentCartInfoDto, RefundCartInfoDto } from './payment.dto';
import { Payment } from './payment.model';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import { AccountType } from '../shared/enums/account.type';
import util from 'util';
import { Language } from '../user/user.enum';
var Iyzipay = require('iyzipay');
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
      console.log('userId: ' + userId);
      const user = await this.userModel
        .find({ _id: userId })
        .limit(1)
        .skip(0)
        .exec();
      let payment = {
        userId: userId,
        status: false,
        accountType: createPayment.paymentType,
        paymentTransactionId: '',
        conversationId: '',
      };

      const nameParts = createPayment.cartHolderName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      const date = new Date();
      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId:
          userId + '-' + date.getFullYear() + '-' + date.getMonth(),
        price:
          createPayment?.paymentType == AccountType?.MONTH
            ? '20'
            : createPayment?.paymentType == AccountType?.YEAR
            ? '60'
            : '50',
        paidPrice:
          createPayment?.paymentType == AccountType?.MONTH
            ? '20'
            : createPayment?.paymentType == AccountType?.YEAR
            ? '60'
            : '50',
        currency:
          user[0]?.language == Language.TR
            ? Iyzipay.CURRENCY.TRY
            : Iyzipay.CURRENCY.USD,
        installment: '1',
        basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
          cardHolderName: createPayment?.cartHolderName,
          cardNumber: createPayment?.cartNumber,
          expireMonth: createPayment?.cartMonth,
          expireYear: createPayment?.cartYear,
          cvc: createPayment?.cartCvv,
          registerCard: '0',
        },
        buyer: {
          id: 'BY789',
          name: firstName,
          surname: lastName,
          gsmNumber: '+905350000000',
          email: 'email@email.com',
          identityNumber: '74300864791',
          lastLoginDate: '2015-10-05 12:43:35',
          registrationDate: '2013-04-21 15:12:09',
          registrationAddress:
            'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          ip: '85.34.78.112',
          city: 'Istanbul',
          country: 'Turkey',
          zipCode: '34732',
        },
        shippingAddress: {
          contactName: createPayment.cartHolderName,
          city: 'Istanbul',
          country: 'Turkey',
          address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          zipCode: '34742',
        },
        billingAddress: {
          contactName: createPayment.cartHolderName,
          city: 'Istanbul',
          country: 'Turkey',
          address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          zipCode: '34742',
        },
        basketItems: [
          {
            id: createPayment?.paymentType,
            name: createPayment?.paymentType,
            category1: 'AI',
            category2: 'ai',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price:
              createPayment?.paymentType == AccountType?.MONTH
                ? '20'
                : createPayment?.paymentType == AccountType?.YEAR
                ? '60'
                : '50',
          },
        ],
      };
      console.log(request);
      const data = await this.createPayment(request);
      if (data?.status == 'success') {
        payment.paymentTransactionId =
          data.itemTransactions[0].paymentTransactionId;
        payment.conversationId = request.conversationId;
        payment.status = true;
      }
      const addPayment = await new this.paymentModel(payment);
      const result = await addPayment.save();
      if (payment?.status) {
        const updateUser = await this.userModel.findByIdAndUpdate(userId, {
          isPayment: true,
          isPaymentDate: new Date(),
          accountType: createPayment.paymentType,
        });
        return {
          status: true,
          data: result,
          message: 'success to add payment',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          data: result,
          message: 'failed to add payment',
          messageType: 0,
        };
      }
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
    createPayment: RefundCartInfoDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }> {
    try {
      const paymentData = await this.paymentModel
        .find({ conversationId: createPayment.conversationId })
        .limit(1)
        .skip(0)
        .exec();
      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: createPayment.conversationId,
        paymentTransactionId: paymentData[0]?.paymentTransactionId,
        price:
          paymentData[0]?.accountType == AccountType?.MONTH
            ? '20'
            : paymentData[0]?.accountType == AccountType?.YEAR
            ? '60'
            : '50',
        currency: paymentData[0]?.currency.toUpperCase(),
        ip: '85.34.78.112',
      };
      const data = await this.returnCreatePayment(request);
      let payment = {
        userId: userId,
        status: false,
        accountType: paymentData[0].accountType,
        isReturned: true,
      };
      if (data.success === 'success') {
        payment.status = true;
      }
      const addPayment = await new this.paymentModel(payment);
      const result = await addPayment.save();
      if (payment?.status) {
        const updateUser = await this.userModel.findByIdAndUpdate(userId, {
          isPayment: false,
          isPaymentDate: new Date(),
          accountType: paymentData[0].accountType,
        });
        return {
          status: true,
          data: result,
          message: 'success to send payment',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          data: result,
          message: 'failed to send payment' + data.errorMessage,
          messageType: 0,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to add payment',
        messageType: 0,
      };
    }
  }

  async createPayment(request): Promise<any> {
    return new Promise((resolve, reject) => {
      const iyzipay = new Iyzipay({
        apiKey: process.env.API_KEY,
        secretKey: process.env.SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com',
      });

      iyzipay.payment.create(request, (err, result) => {
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

  async returnCreatePayment(request): Promise<any> {
    return new Promise((resolve, reject) => {
      const iyzipay = new Iyzipay({
        apiKey: process.env.API_KEY,
        secretKey: process.env.SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com',
      });
      iyzipay.refund.create(request, (err, result) => {
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

  async findPayment(query: QueryDto): Promise<{
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
  async findByIdPayment(id: string): Promise<{
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
