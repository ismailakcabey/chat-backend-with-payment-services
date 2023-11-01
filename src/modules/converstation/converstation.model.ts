import mongoose, { mongo } from "mongoose";

export const ConverstationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
    {
        timestamps: true,
        _id: true
    }

)

export interface Converstation extends mongoose.Document {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    userId: mongoose.Types.ObjectId
    name: string,
}
