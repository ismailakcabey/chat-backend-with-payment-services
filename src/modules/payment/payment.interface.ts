import { QueryDto } from '../shared/dtos/query.dto';
import { PaymentCartInfoDto, RefundCartInfoDto } from './payment.dto';
import { Payment } from './payment.model';

export interface IPayment {
  getPayment(
    createPayment: PaymentCartInfoDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }>;
  returnPayment(
    createPayment: RefundCartInfoDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }>;
  findPayment(query: QueryDto): Promise<{
    status?: boolean;
    data?: Payment[];
    message?: string;
    messageType?: number;
    count?: number;
  }>;
  findByIdPayment(id: string): Promise<{
    status?: boolean;
    data?: Payment;
    message?: string;
    messageType?: number;
  }>;
}
