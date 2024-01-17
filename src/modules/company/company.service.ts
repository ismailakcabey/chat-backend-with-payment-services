import { Inject, Injectable } from '@nestjs/common';
import { ICompany } from './company.interface';
import { QueryDto } from '../shared/dtos/query.dto';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { Company } from './company.model';
import { Model } from 'mongoose';

@Injectable()
export class CompanyService implements ICompany {
  constructor(
    @Inject('CompanyModelToken')
    private readonly companyModel: Model<Company>,
  ) {}
  async createCompany(
    createCompany: CreateCompanyDto,
  ): Promise<{
    status?: boolean;
    data?: Company;
    message?: string;
    messageType?: number;
  }> {
    try {
      const addCompany = new this.companyModel(createCompany);
      const result = await addCompany.save();
      return {
        status: true,
        data: result,
        message: 'success to add company',
        messageType: 0,
      };
    } catch (error) {
      return {
        status: false,
        message: 'failed to add company',
        messageType: 0,
      };
    }
  }
  async updateCompany(
    id: string,
    updateCompany: UpdateCompanyDto,
  ): Promise<{
    status?: boolean;
    data?: Company;
    message?: string;
    messageType?: number;
  }> {
    const company = await this.companyModel.findByIdAndUpdate(
      id,
      updateCompany,
    );
    if (company) {
      return {
        status: true,
        data: company,
        message: 'success to update company',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'company not found',
        messageType: 0,
      };
    }
  }
  async deleteCompany(
    id: string,
  ): Promise<{
    status?: boolean;
    data?: Company;
    message?: string;
    messageType?: number;
  }> {
    const company = await this.companyModel.findByIdAndDelete(id);
    if (company) {
      return {
        status: true,
        data: company,
        message: 'success to delete company',
        messageType: 0,
      };
    } else {
      return {
        status: false,
        message: 'company not found',
        messageType: 0,
      };
    }
  }
  async findByIdCompany(
    id: string,
  ): Promise<{
    status?: boolean;
    data?: Company;
    message?: string;
    messageType?: number;
  }> {
    try {
      const company = await this.companyModel.findById(id).exec();
      if (company) {
        return {
          status: true,
          data: company,
          message: 'success to find company',
          messageType: 0,
        };
      } else {
        return {
          status: false,
          message: 'company not found',
          messageType: 0,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'failed to find by id company',
        messageType: 0,
      };
    }
  }
  async findCompany(
    query: QueryDto,
  ): Promise<{
    status?: boolean;
    data?: Company[];
    message?: string;
    messageType?: number;
    count?: number;
  }> {
    const { where, skip, limit, include, sort } = query;
    try {
      const companies = await this.companyModel
        .find(where)
        .populate(include)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .exec();
      const count = await this.companyModel.countDocuments(where).exec();
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
