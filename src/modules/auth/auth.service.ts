import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/user.model";
import { LoginDto } from "./auth.dto";
import { IAuth } from "./auth.interface";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
const passwordHash = require('password-hash');
export class AuthService implements IAuth{

    constructor(
        @Inject('UserModelToken')
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ){}

    async login(login: LoginDto): Promise<{ status?: boolean; data?: string; message?: string; messageType?: number; }> {
        const loginUser = await this.userModel
        .find({email:login?.email})
        .limit(1)
        .skip(0)
        .exec();
        if (loginUser.length===0) {
            throw new NotFoundException("User not found");
        }

        const isPasswordValid = await passwordHash.verify(login.password, loginUser[0].password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({ id:loginUser[0]?.id ,user: loginUser[0] });

        return {
            status: true,
            data: jwt,
            message:'login user',
            messageType: 0
        };
    }
    async me(token: string): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        const user = await this.userModel
        .find({_id:token})
        .limit(1)
        .skip(0)
        .exec();
        return {
            status: true,
            data: user[0],
            message:'get user',
            messageType: 0
        };
    }
    async verifyUser(id: string): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        const user = await this.userModel.findByIdAndUpdate(id, {isActive:true})
        if(user){
            return{
                status:true,
                data:user,
                message:'success to update user',
                messageType:0
            }
        }
        else{
            return{
                status:false,
                message:'user not found',
                messageType:0
            }
        }
    }

}