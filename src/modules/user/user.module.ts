import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { databaseProviders } from "../database/database.provider";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { RedisCacheService } from "../cache/redis-cache.service";
import RestHelper from "../shared/rest/restHelper";
import { EmailService } from "../shared/email/email.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        ...databaseProviders,
        EmailService
    ]
})

export class UserModule{

}