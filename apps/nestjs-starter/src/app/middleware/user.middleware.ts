import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(@Inject('USER') private readonly user: string) {
  }

  use(req, res, next) {
    req.user = this.user;
    next();
  }
}
