import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../user/user.service';

export const ROLES_KEY = 'ROLES';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.get<Roles[]>(ROLES_KEY);

    const currentRole = context.switchToHttp().getRequest().user.role;

    const isAllowed = allowedRoles.some((role) => currentRole === role);

    return isAllowed;
  }
}
