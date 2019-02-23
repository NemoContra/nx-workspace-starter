import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TeapotException } from '../exceptions/teapot.exception';

export interface CustomRequest extends Request {
  user: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
  };
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const authorizationHeader = request.headers['authorization'];
    if (
      authorizationHeader &&
      authorizationHeader.indexOf('Bearer jwt123456token') !== -1 &&
      request.user &&
      request.user.role === 'admin'
    ) {
      return true;
    }
    throw new TeapotException();
  }
}
