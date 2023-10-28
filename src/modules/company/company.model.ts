import * as mongoose from "mongoose";

export const CompanySchema = new mongoose.Schema({
    // _id otomatik olarak ObjectID olarak oluşturulacak
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    }
}, {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak oluşturur
    _id: true, // _id alanını manuel olarak eklemeyin, otomatik olarak oluşturulsun
});

export interface Company extends mongoose.Document {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    location: string;
}