import { QueryDto } from "../shared/dtos/query.dto";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { User } from "./user.model";


export interface IUser {
    createUser(createUser:CreateUserDto):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
    updateUser(id:string,updateUser:UpdateUserDto):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
    verifyUser(id:string):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
    deleteUser(id:string):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
    findByIdUser(id:string):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
    findUser(query:QueryDto):Promise<
    {
        status?:boolean,
        data?:User[],
        message?:string,
        messageType?:number
        count?:number
    }
    >
}