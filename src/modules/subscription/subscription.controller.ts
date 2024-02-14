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
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';
import axios from 'axios';
import { Request } from 'express';
import { CancelSubscription, CreateSubscriptionDto } from './subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('get')
  async getSubscription(
    @Body() subscription: CreateSubscriptionDto,
    @Req() request: Request,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Subscription;
  }> {
    //@ts-ignore
    const userId = request?.user?.id;
    return await this.subscriptionService.getSubscription(subscription, userId);
  }

  @Post('informationiyzico')
  async getInformationiyzico(@Body() information): Promise<any> {
    return await this.subscriptionService.informationiyzico(information);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('refund')
  async sendSubscription(
    @Body() subscription: CancelSubscription,
    @Req() request: Request,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Subscription;
  }> {
    //@ts-ignore
    const userId = request?.user?.id;
    return await this.subscriptionService.cancelSubscription(
      subscription,
      userId,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/find')
  async findSubscription(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Subscription[];
    count?: number;
  }> {
    return await this.subscriptionService.findSubs(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async findByIdSubscription(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Subscription;
  }> {
    return await this.subscriptionService.findByIdSubs(id);
  }
}
