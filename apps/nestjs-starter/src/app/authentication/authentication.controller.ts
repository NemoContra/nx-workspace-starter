import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { username: string; password: string }
  ): Promise<{ token: string }> {
    return this.authenticationService.login(body.username, body.password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body('token') token: string): Promise<void> {
    const deleted = await this.authenticationService.logout(token);
    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
