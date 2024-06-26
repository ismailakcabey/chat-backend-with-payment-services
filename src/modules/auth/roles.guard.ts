import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './roles.decorator';
import { Role } from '../user/user.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!requiredRoles){
            return true;
        }
        const { user } = context.switchToHttp().getRequest()
        return requiredRoles.some((role)=> user?.user?.role?.includes(role))
    }
}