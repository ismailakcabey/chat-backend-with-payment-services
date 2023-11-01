import { QueryDto } from "../shared/dtos/query.dto";
import { CreateConverstationDto, UpdateConverstationDto } from "./converstation.dto";
import { Converstation } from "./converstation.model";

export interface IConverstation {

    createConverstation(createConverstation:CreateConverstationDto):Promise<{
        status?:boolean,
        data?:Converstation,
        message?:string,
        messageType?:number
    }>
        
    updateConverstation(id:string,updateConverstation:UpdateConverstationDto):Promise<{
        status?:boolean,
        data?:Converstation,
        message?:string,
        messageType?:number
    }>

    deleteConverstation(id:string):Promise<{
        status?:boolean,
        data?:Converstation,
        message?:string,
        messageType?:number
    }>

    findByIdConverstation(id:string):Promise<{
        status?:boolean,
        data?:Converstation,
        message?:string,
        messageType?:number
    }>

    findConverstation(query:QueryDto):Promise<{
        status?:boolean,
        data?:Converstation[],
        message?:string,
        messageType?:number
        count?:number
    }>


}