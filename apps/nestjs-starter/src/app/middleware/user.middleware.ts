import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  resolve(user: object): MiddlewareFunction {
    return (req, res, next) => {
      req.user = user;
      next();
    };
  }
}
