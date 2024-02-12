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
import { PaymentPlanService } from './paymentPlan.service';
import { CreatePaymentPlanDto, UpdatePaymentPlanDto } from './paymentPlan.dto';
import { PaymentPlan } from './paymentPlan.model';
import { QueryDto } from '../shared/dtos/query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/user.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('paymentPlan')
export class PaymentPlanController {
  constructor(private readonly paymentPlanService: PaymentPlanService) {}

  @Post()
  async createPaymentPlan(@Body() paymentPlan: CreatePaymentPlanDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: PaymentPlan;
  }> {
    return await this.paymentPlanService.createPaymentPlan(paymentPlan);
  }

  @Post('/find')
  async findPaymentPlan(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: PaymentPlan[];
    count?: number;
  }> {
    return await this.paymentPlanService.findPaymentPlan(query);
  }

  @Get(':id')
  async findByIdPaymentPlan(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: PaymentPlan;
  }> {
    return await this.paymentPlanService.findByIdPaymentPlan(id);
  }

  @Patch(':id')
  async updateByIdPaymentPlan(
    @Param('id') id: string,
    @Body() paymentPlan: UpdatePaymentPlanDto,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: PaymentPlan;
  }> {
    return await this.paymentPlanService.updatePaymentPlan(id, paymentPlan);
  }

  @Delete(':id')
  async deleteByIdPaymentPlan(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: PaymentPlan;
  }> {
    return await this.paymentPlanService.deletePaymentPlan(id);
  }
}
