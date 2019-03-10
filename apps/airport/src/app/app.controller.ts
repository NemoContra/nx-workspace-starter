import { CacheInterceptor, CacheKey, Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @CacheKey('airports')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern({cmd: 'airports'})
  public getAirports(): string[] {
    return this.appService.getAirports();
  }
}
