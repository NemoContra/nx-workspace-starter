import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AirportGuard } from './airport.guard';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'airports' })
  @UseGuards(AirportGuard)
  public getAirports(): string[] {
    return [
      'Flughafen Wien-Schwechat',
      'Flughafen Manfred Rommel Stuttgart',
      'Flughafen Helmut Schmidt Hamburg',
    ];
  }
}
