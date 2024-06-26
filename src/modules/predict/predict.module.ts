import { Module } from "@nestjs/common";
import { PredictSchema } from "./predict.model";
import { MongooseModule } from "@nestjs/mongoose";
import { databaseProviders } from "../database/database.provider";
import { PredictService } from "./predict.service";
import { PredictController } from "./predict.controller";
import RestHelper from "../shared/rest/restHelper";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Predict', schema: PredictSchema }]),  
    ],
    controllers:[
        PredictController
    ],
    providers:[
        PredictService,
        ...databaseProviders,
        RestHelper
    ]
})

export class PredictModule {

}