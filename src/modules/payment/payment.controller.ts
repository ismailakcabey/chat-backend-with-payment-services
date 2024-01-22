import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QueryDto } from '../shared/dtos/query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/user.enum';
import { RolesGuard } from '../auth/roles.guard';
import { PaymentService } from './payment.service';
import { PaymentCartInfoDto, RefundCartInfoDto } from './payment.dto';
import { Payment } from './payment.model';
import axios from 'axios';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('get')
  async getPayment(
    @Body() payment: PaymentCartInfoDto,
    @Req() request: Request,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Payment;
  }> {
    //@ts-ignore
    const userId = request?.user?.id;
    return await this.paymentService.getPayment(payment, userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('send')
  async sendPayment(
    @Body() payment: RefundCartInfoDto,
    @Req() request: Request,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Payment;
  }> {
    //@ts-ignore
    const userId = request?.user?.id;
    return await this.paymentService.returnPayment(payment, userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/find')
  async findPayment(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Payment[];
    count?: number;
  }> {
    return await this.paymentService.findPayment(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async findByIdPayment(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Payment;
  }> {
    return await this.paymentService.findByIdPayment(id);
  }
}
