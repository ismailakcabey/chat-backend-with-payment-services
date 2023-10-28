import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanySchema } from "./company.model";
import { databaseProviders } from "../database/database.provider";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    ],
    controllers: [
        CompanyController
    ],
    providers: [
        CompanyService,
        ...databaseProviders
    ]
})

export class CompanyModule{

}