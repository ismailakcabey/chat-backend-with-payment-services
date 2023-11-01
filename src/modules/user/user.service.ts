import { Inject, Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { QueryDto } from "../shared/dtos/query.dto";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { User } from "./user.model";
import { Model } from "mongoose";
import { RedisCacheService } from "../cache/redis-cache.service";
import RestHelper from "../shared/rest/restHelper";
const passwordHash = require('password-hash');

@Injectable()
export class UserService implements IUser{

    constructor(
        @Inject('UserModelToken')
        private readonly userModel: Model<User>,
        private readonly restHelper: RestHelper
    ){}

    async createUser(createUser: CreateUserDto): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        try {
            const mailControlUser = await this.userModel.findOne({mail: createUser?.email})
        if(mailControlUser){
            return{
                status:false,
                message:'failed to create user already',
                messageType: 0,
            }
        }
        else{
            createUser.password = passwordHash.generate(createUser.password)
            const addUser = new this.userModel(createUser)
            const result = await addUser.save()
            return {
                status:true,
                data:result,
                message:'success to add user',
                messageType:0
            }
        }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'failed to create user',
                messageType: 0,
            };
        }
    }
    async updateUser(id: string, updateUser: UpdateUserDto): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUser)
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
    async deleteUser(id: string): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        const user = await this.userModel.findByIdAndDelete(id)
        if(user){
            return{
                status:true,
                data:user,
                message:'success to delete user',
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
    async findByIdUser(id: string): Promise<{ status?: boolean; data?: User; message?: string; messageType?: number; }> {
        try {
            const user = await this.userModel.findById(id).exec()
            if(user){
                return{
                    status:true,
                    data:user,
                    message:'success to find user',
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
        } catch (error) {
            return {
                status:false,
                message:'failed to find by id user',
                messageType:0
            }
        }
    }
    async findUser(query: QueryDto): Promise<{ status?: boolean; data?: User[]; message?: string; messageType?: number; count?: number; }> {
        try {
            const { where, skip, limit,include } = query
            const users = await this.userModel
                .find(where)
                .populate(include)
                .limit(limit)
                .skip(skip)
                .exec();
                const count = await this.userModel.countDocuments(where).exec();
                return {
                    status: true,
                    data: users,
                    message: 'success to find companies',
                    messageType: 0,
                    count: count,
                };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'failed to find companies',
                messageType: 0,
            };
        }
    }
}