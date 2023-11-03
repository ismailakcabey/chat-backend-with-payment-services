import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { databaseProviders } from "../database/database.provider";
import { PaymentSchema } from "./payment.model";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PaymentCron } from "./payment.cron";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
        ScheduleModule.forRoot()
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService,
        ...databaseProviders,
        PaymentCron
    ]
})

export class PaymentModule {

}