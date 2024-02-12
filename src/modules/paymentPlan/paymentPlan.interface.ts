import { QueryDto } from '../shared/dtos/query.dto';
import { CreatePaymentPlanDto, UpdatePaymentPlanDto } from './paymentPlan.dto';
import { PaymentPlan } from './paymentPlan.model';

export interface IPaymentPlan {
  createPaymentPlan(createPaymentPlan: CreatePaymentPlanDto): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }>;
  updatePaymentPlan(
    id: string,
    updatePaymentPlan: UpdatePaymentPlanDto,
  ): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }>;
  deletePaymentPlan(id: string): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }>;
  findByIdPaymentPlan(id: string): Promise<{
    status?: boolean;
    data?: PaymentPlan;
    message?: string;
    messageType?: number;
  }>;
  findPaymentPlan(query: QueryDto): Promise<{
    status?: boolean;
    data?: PaymentPlan[];
    message?: string;
    messageType?: number;
    count?: number;
  }>;
}
