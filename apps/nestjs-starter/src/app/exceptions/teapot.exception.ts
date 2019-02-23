import { HttpException, HttpStatus } from '@nestjs/common';

export class TeapotException extends HttpException {
  constructor() {
    super("I'm a Teapot", HttpStatus.I_AM_A_TEAPOT);
  }
}
