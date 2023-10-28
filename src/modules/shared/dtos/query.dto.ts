import { IsInt, IsObject, IsOptional } from "class-validator";

export class QueryDto {
    @IsObject()
    readonly where?: object;

    @IsInt()
    @IsOptional()
    readonly limit?: number;

    @IsInt()
    @IsOptional()
    readonly skip?: number;
}