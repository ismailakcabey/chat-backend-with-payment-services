import { IsString, IsOptional } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly location?: string;
}

export class UpdateCompanyDto {
    @IsString()
    @IsOptional() // name alanı opsiyonel
    readonly name?: string;

    @IsString()
    @IsOptional() // location alanı opsiyonel
    readonly location?: string;
}