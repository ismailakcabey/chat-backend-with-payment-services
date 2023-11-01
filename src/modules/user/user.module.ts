import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { databaseProviders } from "../database/database.provider";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        ...databaseProviders
    ]
})

export class UserModule{

}