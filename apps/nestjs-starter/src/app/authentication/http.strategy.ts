import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { AuthenticationService } from './authentication.service';
import { User } from '../user/user.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super();
  }

  async validate(token: string): Promise<User> {
    const user = await this.authService.getUserByTokenAndVerify(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
