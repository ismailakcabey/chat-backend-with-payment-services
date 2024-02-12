import * as mongoose from 'mongoose';

export const PaymentPlanSchema = new mongoose.Schema(
  {
    // _id otomatik olarak ObjectID olarak oluşturulacak
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    response: {
      type: String,
      required: false,
    },
    paymentPlanReferenceCode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface PaymentPlan extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  response: string;
  paymentPlanReferenceCode: string;
}
