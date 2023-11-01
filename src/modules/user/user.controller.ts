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
} from '@nestjs/common';
import { QueryDto } from '../shared/dtos/query.dto';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

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
  @Post('find')
  async findUser(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: User[];
  }> {
    return await this.userService.findUser(query);
  }
  @Get(':id')
    async findByIdUser(
        @Param('id') id : string,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:User
    }> {
        return await this.userService.findByIdUser(id)
    }
    @Delete(':id')
    async deleteByIdUser(
        @Param('id') id : string,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:User
    }> {
        return await this.userService.deleteUser(id)
    }
    @Patch(':id')
    async updateByIdUser(
        @Param('id') id : string,
        @Body() user: UpdateUserDto,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:User
    }> {
        return await this.userService.updateUser(id,user)
    }
    @Get('verify/:id')
    async verifyUser(
        @Param('id') id : string,
    ): Promise<{
        status?:boolean,
        message?:string,
        messageType?:number,
        data?:User
    }> {
        return await this.userService.verifyUser(id)
    }
}
