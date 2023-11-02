import { QueryDto } from "../shared/dtos/query.dto";
import { CreatePredictDto } from "./predict.dto";
import { Predict } from "./predict.model";

export interface IPredict{
    createPredict(createPredict: CreatePredictDto):Promise<{
        status?:boolean,
        data?:Predict,
        message?:string,
        messageType?:number 
    }>
    deletePredict(id:string):Promise<{
        status?:boolean,
        data?:Predict,
        message?:string,
        messageType?:number
    }>
    findByIdPredict(id:string):Promise<{
        status?:boolean,
        data?:Predict,
        message?:string,
        messageType?:number
    }>
    findPredict(query:QueryDto):Promise<{
        status?:boolean,
        data?:Predict[],
        message?:string,
        messageType?:number
        count?:number
    }>
    findPredictByConverstation(converstationId:string):Promise<{
        status?:boolean,
        data?:Predict[],
        message?:string,
        messageType?:number
        count?:number
    }>
}