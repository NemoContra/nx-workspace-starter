import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader && authorizationHeader.indexOf('Bearer jwt123456token') !== -1) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
