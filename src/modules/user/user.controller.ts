import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { QueryDto } from '../shared/dtos/query.dto';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from './user.enum';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('find')
  async findUser(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User[];
  }> {
    return await this.userService.findUser(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findByIdUser(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.userService.findByIdUser(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async deleteByIdUser(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async updateByIdUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.userService.updateUser(id, user);
  }

  @Get('verify/:id')
  async verifyUser(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User;
  }> {
    return await this.userService.verifyUser(id);
  }
}
