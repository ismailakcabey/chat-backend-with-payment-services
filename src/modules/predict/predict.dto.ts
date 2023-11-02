import { IsMongoId, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreatePredictDto{

    @IsString()
    readonly question: string;

    @IsMongoId()
    readonly converstationId: mongoose.Schema.Types.ObjectId

}