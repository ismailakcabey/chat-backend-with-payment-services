import * as mongoose from 'mongoose';
import { Language, Role } from './user.enum';
import { AccountType } from '../shared/enums/account.type';

export const UserSchema = new mongoose.Schema(
  {
    // _id otomatik olarak ObjectID olarak oluşturulacak
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isKvkk: {
      type: Boolean,
      required: false,
      default: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      enum: Object.values(Language), // Enum değerlerini burada belirtin
      required: false,
      default: Language.EN, // Varsayılan değeri burada belirtin
    },
    role: {
      type: String,
      enum: Object.values(Role), // Enum değerlerini burada belirtin
      required: false,
      default: Role.USER, // Varsayılan değeri burada belirtin
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType), // Enum değerlerini burada belirtin
      required: false,
      default: AccountType.MONTH, // Varsayılan değeri burada belirtin
    },
    customerReferenceCode: {
      type: String,
      required: false,
    },
    isPayment: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPaymentDate: {
      type: Date,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company', // Company modeline referans
      required: false,
      default: null, // İsteğe bağlı olarak varsayılan değer atayabilirsiniz
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface User extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  isKvkk: boolean;
  language: Language;
  role: Role;
  accountType: AccountType;
  isPayment: boolean;
  isPaymentDate: Date;
  isActive: boolean;
  companyId: mongoose.Types.ObjectId | null;
  customerReferenceCode: string;
}
