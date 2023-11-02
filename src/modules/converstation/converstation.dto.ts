import { IsMongoId, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateConverstationDto {
    @IsString()
    readonly name: string;

}

export class UpdateConverstationDto {
    @IsString()
    @IsOptional()
    readonly name: string;
}