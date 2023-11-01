import { Inject, Injectable } from "@nestjs/common";
import { IConverstation } from "./converstation.interface";
import { QueryDto } from "../shared/dtos/query.dto";
import { CreateConverstationDto, UpdateConverstationDto } from "./converstation.dto";
import { Converstation } from "./converstation.model";
import { Model } from "mongoose";

@Injectable()
export class ConverstationService implements IConverstation{
    constructor(
        @Inject('ConverstationModelToken')
        private readonly converstationModel: Model<Converstation>,
    ){}
    async createConverstation(createConverstation: CreateConverstationDto): Promise<{ status?: boolean; data?: Converstation; message?: string; messageType?: number; }> {
        try {
            const addConverstation = new this.converstationModel(createConverstation);
            const result = await addConverstation.save()
            return {
                status:true,
                data:result,
                message:'success to add converstation',
                messageType:0
            }
        } catch (error) {
            return {
                status:false,
                message:'failed to add converstation',
                messageType:0
            }
        }
    }
    async updateConverstation(id: string, updateConverstation: UpdateConverstationDto): Promise<{ status?: boolean; data?: Converstation; message?: string; messageType?: number; }> {
        const converstation = await this.converstationModel.findByIdAndUpdate(id, updateConverstation)
        if(converstation){
            return{
                status:true,
                data:converstation,
                message:'success to update converstation',
                messageType:0
            }
        }
        else{
            return{
                status:false,
                message:'converstation not found',
                messageType:0
            }
        }
    }
    async deleteConverstation(id: string): Promise<{ status?: boolean; data?: Converstation; message?: string; messageType?: number; }> {
        const converstation = await this.converstationModel.findByIdAndDelete(id)
        if(converstation){
            return{
                status:true,
                data:converstation,
                message:'success to delete converstation',
                messageType:0
            }
        }
        else{
            return{
                status:false,
                message:'converstation not found',
                messageType:0
            }
        }
    }
    async findByIdConverstation(id: string): Promise<{ status?: boolean; data?: Converstation; message?: string; messageType?: number; }> {
        try {
            const converstation = await this.converstationModel.findById(id).exec()
            if(converstation){
                return{
                    status:true,
                    data:converstation,
                    message:'success to find converstation',
                    messageType:0
                }
            }
            else{
                return{
                    status:false,
                    message:'converstation not found',
                    messageType:0
                }
            }
        } catch (error) {
            return {
                status:false,
                message:'failed to find by id converstation',
                messageType:0
            }
        }
    }
    async findConverstation(query: QueryDto): Promise<{ status?: boolean; data?: Converstation[]; message?: string; messageType?: number; count?:number}> {
        const { where, skip, limit } = query
        try {
            const companies = await this.converstationModel
                .find(where)
                .limit(limit)
                .skip(skip)
                .exec();
            const count = await this.converstationModel.countDocuments(where).exec();
            return {
                status: true,
                data: companies,
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