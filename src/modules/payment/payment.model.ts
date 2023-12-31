import mongoose from 'mongoose';
import { Currency } from './payment.enum';
import { AccountType } from '../shared/enums/account.type';

export const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Company modeline referans
      required: false,
      default: null, // İsteğe bağlı olarak varsayılan değer atayabilirsiniz
    },
    status: {
      type: Boolean,
      required: false,
    },
    paymentTransactionId: {
      type: String,
      required: false,
    },
    conversationId: {
      type: String,
      required: false,
    },
    isReturned: {
      type: Boolean,
      required: false,
      default: false,
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType), // Enum değerlerini burada belirtin
      required: false,
      default: AccountType.MONTH, // Varsayılan değeri burada belirtin
    },
    currency: {
      type: String,
      enum: Object.values(Currency), // Enum değerlerini burada belirtin
      required: false,
      default: Currency.USD, // Varsayılan değeri burada belirtin
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface Payment extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Types.ObjectId | null;
  paymentTransactionId: string;
  conversationId: string;
  currency: Currency;
  accountType: AccountType;
  isReturned: boolean;
  status: boolean;
}
