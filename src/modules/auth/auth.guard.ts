import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('UserModelToken')
    private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token is required');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      const user = await this.userModel
        .find({ _id: payload?.id, isActive: true })
        .limit(1)
        .skip(0)
        .exec();
      if (
        !(
          request?.route?.path === '/auth/login' ||
          request?.route?.path === '/user' ||
          request?.route?.path === '/payment/get' ||
          request?.route?.path === '/subscription/get'
        )
      ) {
        if (!user[0]?.isPayment) {
          throw new UnauthorizedException('user not payment found');
        }
      }
      if (user == null || user == undefined || user.length === 0) {
        throw new UnauthorizedException('user not found');
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    return {
      status: true,
      user: request.user,
    };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
