import { QueryDto } from '../shared/dtos/query.dto';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.model';

export interface IProduct {
  createProduct(createProduct: CreateProductDto): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }>;
  updateProduct(
    id: string,
    updateProduct: UpdateProductDto,
  ): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }>;
  deleteProduct(id: string): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }>;
  findByIdProduct(id: string): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }>;
  findProduct(query: QueryDto): Promise<{
    status?: boolean;
    data?: Product[];
    message?: string;
    messageType?: number;
    count?: number;
  }>;
}
