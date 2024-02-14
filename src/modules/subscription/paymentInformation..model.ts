import * as mongoose from 'mongoose';

export const PaymentInformationSchema = new mongoose.Schema(
  {
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface PaymentInformation extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  response: string;
}
