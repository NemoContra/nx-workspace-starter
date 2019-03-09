import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({cmd: 'airports'})
  public getAirports(): string[] {
    return [
      'Flughafen Wien-Schwechat',
      'Flughafen Manfred Rommel Stuttgart',
      'Flughafen Helmut Schmidt Hamburg'
    ];
  }
}
