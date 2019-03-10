import { CacheInterceptor, CacheKey, Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @CacheKey('airports')
  @UseInterceptors(CacheInterceptor)
  @MessagePattern({cmd: 'airports'})
  public getAirports(): Observable<string[]> {
    return this.appService.getAirports();
  }
}
