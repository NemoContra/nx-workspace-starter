import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AirportService implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    @Inject('AIRPORT_SERVICE') private client: ClientProxy
  ) {}

  async onModuleInit(): Promise<void> {
    // await this.client.connect();
    this.logger.log('Successfully connected to Airport Microservice');
  }

  public getAirports(): Observable<string[]> {
    return this.client.send<string[]>({ cmd: 'airports' }, 'airports');
  }
}
