import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConverstationSchema } from "./converstation.model";
import { databaseProviders } from "../database/database.provider";
import { ConverstationService } from "./converstation.service";
import { ConverstationController } from "./converstation.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Converstation', schema: ConverstationSchema }]),
    ],
    controllers: [
        ConverstationController
    ],
    providers: [
        ConverstationService,
        ...databaseProviders
    ]
})

export class ConverstationModule {

}