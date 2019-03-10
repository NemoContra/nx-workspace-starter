import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AirportClient } from './airport-client.decorator';

@Injectable()
export class AirportService implements OnModuleInit {
  @AirportClient() private client: ClientProxy;

  constructor(private readonly logger: Logger) { }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
    this.logger.log('Successfully connected to Airport Microservice');
  }
  
  public getAirports(): Observable<string[]> {
    return this.client.send<string[]>({cmd: 'airports'}, 'airports');
  }
}
