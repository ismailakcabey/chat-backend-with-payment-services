import { User } from '../user/user.model';
import { LoginDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() login: LoginDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: string;
  }> {
    return await this.authService.login(login);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    //@ts-ignore
    const authenticatedUserId = req?.user?.id;
    return await this.authService.me(authenticatedUserId);
  }

  @Get('verify/:id')
  async verify(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.authService.verifyUser(id);
  }
}
