import { QueryDto } from "../shared/dtos/query.dto";
import { CreateCompanyDto, UpdateCompanyDto } from "./company.dto";
import { Company } from "./company.model";

export interface ICompany {
    createCompany(createCompany:CreateCompanyDto):Promise<
    {
        status?:boolean,
        data?:Company,
        message?:string,
        messageType?:number
    }
    >
    updateCompany(id:string,updateCompany:UpdateCompanyDto):Promise<
    {
        status?:boolean,
        data?:Company,
        message?:string,
        messageType?:number
    }
    >
    deleteCompany(id:string):Promise<
    {
        status?:boolean,
        data?:Company,
        message?:string,
        messageType?:number
    }
    >
    findByIdCompany(id:string):Promise<
    {
        status?:boolean,
        data?:Company,
        message?:string,
        messageType?:number
    }
    >
    findCompany(query:QueryDto):Promise<
    {
        status?:boolean,
        data?:Company[],
        message?:string,
        messageType?:number
        count?:number
    }
    >
}