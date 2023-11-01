import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/user.model";
import { AuthController } from "./auth.controller";
import { databaseProviders } from "../database/database.provider";
import { JwtModule } from "@nestjs/jwt";
import { RolesGuard } from "./roles.guard";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: {
                    expiresIn: '1d'
                  }
          }),
    ],
    controllers:[
        AuthController
    ],
    providers:[
        AuthService,
        ...databaseProviders,
        RolesGuard,
    ],
})

export class AuthModule{

}