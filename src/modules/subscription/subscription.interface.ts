import { QueryDto } from '../shared/dtos/query.dto';
import { CancelSubscription, CreateSubscriptionDto } from './subscription.dto';
import { Subscription } from './subscription.model';

export interface ISubscription {
  getSubscription(
    createSubscription: CreateSubscriptionDto,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }>;
  findSubs(query: QueryDto): Promise<{
    status?: boolean;
    data?: Subscription[];
    message?: string;
    messageType?: number;
    count?: number;
  }>;
  findByIdSubs(id: string): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }>;
  cancelSubscription(
    cancelSubscription: CancelSubscription,
    userId: string,
  ): Promise<{
    status?: boolean;
    data?: Subscription;
    message?: string;
    messageType?: number;
  }>;
}
