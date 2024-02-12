import { Inject, Injectable, Logger } from '@nestjs/common';
import { IProduct } from './product.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.model';
import { Model } from 'mongoose';
var Iyzipay = require('iyzipay');

@Injectable()
export class ProductService implements IProduct {
  constructor(
    @Inject('ProductModelToken')
    private readonly productModel: Model<Product>,
  ) {}
  async createProduct(createProduct: CreateProductDto): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }> {
    try {
      const addProduct = new this.productModel(createProduct);
      const request = {
        locale: Iyzipay.LOCALE.EN,
        conversationId: `${createProduct?.name}-${createProduct?.description}`,
        name: createProduct?.name,
        description: createProduct?.description,
      };

      const data = await this.createSubsProduct(request);
      addProduct.response = JSON.stringify(data);
      if (data?.status == 'success') {
        addProduct.productReferenceCode = data?.productReferenceCode;
        const result = await addProduct.save();
        return {
          status: true,
          data: result,
          message: 'success to add product',
          messageType: 0,
        };
      }
      return {
        status: true,
        data: undefined,
        message: 'success to add product',
        messageType: 0,
      };
    } catch (error) {
      return {
        status: false,
        message: 'failed to add product',
        messageType: 0,
      };
    }
  }
  async createSubsProduct(request): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(process.env.API_KEY, 'burada');
      const iyzipay = new Iyzipay({
        apiKey: process.env.API_KEY,
        secretKey: process.env.SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com',
      });

      iyzipay.subscriptionProduct.create(request, (err, result) => {
        if (result) {
          Logger.log(result);
          resolve(result);
        } else {
          Logger.error(err);
          reject(err);
        }
      });
    });
  }
  async updateProduct(
    id: string,
    updateProduct: UpdateProductDto,
  ): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProduct,
    );
    if (product) {
      return {
        status: true,
        data: product,
        message: 'success to update product',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'product not found',
        messageType: 0,
      };
    }
  }
  async deleteProduct(id: string): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (product) {
      return {
        status: true,
        data: product,
        message: 'success to delete product',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'product not found',
        messageType: 0,
      };
    }
  }
  async findByIdProduct(id: string): Promise<{
    status?: boolean;
    data?: Product;
    message?: string;
    messageType?: number;
  }> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (product) {
        return {
          status: true,
          data: product,
          message: 'success to find product',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'product not found',
          messageType: 0,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'failed to find by id product',
        messageType: 0,
      };
    }
  }
  async findProduct(query: QueryDto): Promise<{
    status?: boolean;
    data?: Product[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    const { where, skip, limit, include, sort } = query;
    try {
      const companies = await this.productModel
        .find(where)
        .populate(include)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();
      const count = await this.productModel.countDocuments(where).exec();
      return {
        status: true,
        data: companies,
        message: 'success to find companies',
        messageType: 0,
        count: count,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'failed to find companies',
        messageType: 0,
      };
    }
  }
}
