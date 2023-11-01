import { User } from "../user/user.model";
import { LoginDto } from "./auth.dto";

export interface IAuth {
    login(login:LoginDto):Promise<{
        status?:boolean,
        data?:string,
        message?:string,
        messageType?:number
    }>;
    me(token:string):Promise<{
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }>
    verifyUser(id:string):Promise<
    {
        status?:boolean,
        data?:User,
        message?:string,
        messageType?:number
    }
    >
}