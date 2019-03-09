import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {

  constructor(private authenticationService: AuthenticationService) {
  }

  @Post('login')
  login(@Body() body: {username: string, password: string}): {token: string} {
    return this.authenticationService.login(body.username, body.password);
  }
}
