import mongoose from 'mongoose';

export const PredictSchema = new mongoose.Schema(
  {
    converstationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Converstation',
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  },
);

export interface Predict extends mongoose.Document{
    id:string,
    createdAt:Date,
    updatedAt:Date,
    question:string,
    answer:string,
    converstationId:mongoose.Types.ObjectId,
}