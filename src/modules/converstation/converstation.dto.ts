import { IsMongoId, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateConverstationDto {
    @IsString()
    readonly name: string;

    @IsMongoId()
    readonly userId: mongoose.Schema.Types.ObjectId

}

export class UpdateConverstationDto {
    @IsString()
    @IsOptional()
    readonly name: string;
}