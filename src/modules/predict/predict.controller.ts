import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { QueryDto } from '../shared/dtos/query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/user.enum';
import { RolesGuard } from '../auth/roles.guard';
import { PredictService } from './predict.service';
import { CreatePredictDto } from './predict.dto';
import { Predict } from './predict.model';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('predict')
export class PredictController {
  constructor(private readonly predictService: PredictService) {}

  @Post()
  async createPredict(@Body() predict: CreatePredictDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Predict;
  }> {
    return await this.predictService.createPredict(predict);
  }

  @Post('/find')
  async findCPredict(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Predict[];
    count?: number;
  }> {
    return await this.predictService.findPredict(query);
  }

  @Get(':id')
  async findByIdPredict(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Predict;
  }> {
    return await this.predictService.findByIdPredict(id);
  }

  @Get('converstation/:id')
  async findByIdConverstationPredict(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Predict[];
  }> {
    return await this.predictService.findPredictByConverstation(id);
  }

  @Delete(':id')
  async deleteByIdPredict(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Predict;
  }> {
    return await this.predictService.deletePredict(id);
  }
}
