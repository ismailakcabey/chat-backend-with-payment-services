import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
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
    productReferenceCode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
  },
);

export interface Product extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  response: string;
  productReferenceCode: string;
}
