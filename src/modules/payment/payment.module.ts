import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { databaseProviders } from "../database/database.provider";
import { PaymentSchema } from "./payment.model";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService,
        ...databaseProviders
    ]
})

export class PaymentModule {

}