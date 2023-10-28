import {
    Controller,
    Post,
    Body, 
    Get,
    Param,
    Delete,
    Patch} from "@nestjs/common";
import {CompanyService} from "./company.service";
import { CreateCompanyDto, UpdateCompanyDto } from "./company.dto";
import { Company } from "./company.model";
import { ValidationPipe } from "../validation/validation.pipe";
import { QueryDto } from "../shared/dtos/query.dto";

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ){}

    @Post()
    async createCompany(
        @Body(new ValidationPipe()) company: CreateCompanyDto,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:Company
    }> {
        return await this.companyService.createCompany(company)
    }

    @Post('/find')
    async findCompany(
        @Body(new ValidationPipe()) query: QueryDto,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:Company[],
        count?:number
    }> {
        return await this.companyService.findCompany(query)
    }

    @Get(':id')
    async findByIdCompany(
        @Param('id') id : string,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:Company
    }> {
        return await this.companyService.findByIdCompany(id)
    }

    @Patch(':id')
    async updateByIdCompany(
        @Param('id') id : string,
        @Body(new ValidationPipe()) company: UpdateCompanyDto,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:Company
    }> {
        return await this.companyService.updateCompany(id,company)
    }

    @Delete(':id')
    async deleteByIdCompany(
        @Param('id') id : string,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:Company
    }> {
        return await this.companyService.deleteCompany(id)
    }

}