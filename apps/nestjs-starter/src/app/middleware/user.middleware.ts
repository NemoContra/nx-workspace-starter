import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export interface CustomRequest extends Request {
  user: string;
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(@Inject('USER') private readonly user: string) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    req.user = this.user;
    next();
  }
}
