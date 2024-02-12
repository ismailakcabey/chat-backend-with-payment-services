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
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.model';
import { QueryDto } from '../shared/dtos/query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/user.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Product;
  }> {
    return await this.productService.createProduct(product);
  }

  @Post('/find')
  async findProduct(@Body() query: QueryDto): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Product[];
    count?: number;
  }> {
    return await this.productService.findProduct(query);
  }

  @Get(':id')
  async findByIdProduct(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Product;
  }> {
    return await this.productService.findByIdProduct(id);
  }

  @Patch(':id')
  async updateByIdProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Product;
  }> {
    return await this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteByIdProduct(@Param('id') id: string): Promise<{
    status?: boolean;
    message?: string;
    messageType?: number;
    data?: Product;
  }> {
    return await this.productService.deleteProduct(id);
  }
}
