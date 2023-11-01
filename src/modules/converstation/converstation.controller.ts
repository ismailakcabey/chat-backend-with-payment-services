import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Patch,
    UseGuards
} from "@nestjs/common";
import { ConverstationService } from "./converstation.service";
import { CreateConverstationDto, UpdateConverstationDto } from "./converstation.dto";
import { Converstation } from "./converstation.model";
import { QueryDto } from "../shared/dtos/query.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/user.enum";
import { RolesGuard } from "../auth/roles.guard";

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN,Role.USER)
@Controller('converstation')
export class ConverstationController {
    constructor(
        private readonly converstationService: ConverstationService
    ) { }

    @Post()
    async createConverstation(
        @Body() converstation: CreateConverstationDto,
    ): Promise<{
        status?: boolean,
        message?: string,
        messageType?: number,
        data?: Converstation
    }> {
        return await this.converstationService.createConverstation(converstation)
    }

    @Post('/find')
    async findConverstation(
        @Body() query: QueryDto,
    ): Promise<{
        status?: boolean,
        message?: string,
        messageType?: number,
        data?: Converstation[],
        count?: number
    }> {
        return await this.converstationService.findConverstation(query)
    }

    @Get(':id')
    async findByIdConverstation(
        @Param('id') id: string,
    ): Promise<{
        status?: boolean,
        message?: string,
        messageType?: number,
        data?: Converstation
    }> {
        return await this.converstationService.findByIdConverstation(id)
    }

    @Patch(':id')
    async updateByIdConverstation(
        @Param('id') id: string,
        @Body() converstation: UpdateConverstationDto,
    ): Promise<{
        status?: boolean,
        message?: string,
        messageType?: number,
        data?: Converstation
    }> {
        return await this.converstationService.updateConverstation(id, converstation)
    }

    @Delete(':id')
    async deleteByIdConverstation(
        @Param('id') id: string,
    ): Promise<{
        status?: boolean,
        message?: string,
        messageType?: number,
        data?: Converstation
    }> {
        return await this.converstationService.deleteConverstation(id)
    }

}