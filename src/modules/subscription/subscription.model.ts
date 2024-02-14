import * as mongoose from 'mongoose';
import { AccountType } from '../shared/enums/account.type';

export const SubscriptionSchema = new mongoose.Schema(
  {
    // _id otomatik olarak ObjectID olarak oluşturulacak
    pricingPlanReferenceCode: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expireYear: {
      type: String,
      required: true,
    },
    cvc: {
      type: String,
      required: true,
    },
    expireMonth: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gsmNumber: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    activateStatus: {
      type: Boolean,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    cancelresponse: {
      type: String,
      required: false,
    },
    subsReferenceCode: {
      type: String,
      required: true,
    },
    customerReferenceCode: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: Object.values(AccountType), // Enum değerlerini burada belirtin
      required: false,
      default: AccountType.MONTH, // Varsayılan değeri burada belirtin
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface Subscription extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pricingPlanReferenceCode: string;
  cardHolderName: string;
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  cvc: string;
  name: string;
  surname: string;
  email: string;
  gsmNumber: string;
  contactName: string;
  city: string;
  district: string;
  country: string;
  address: string;
  zipCode: string;
  activateStatus: boolean;
  response: string;
  cancelresponse: string;
  subsReferenceCode: string;
  customerReferenceCode: string;
  paymentType: AccountType;
  identityNumber: string;
}
