import { Logger, Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AirportController],
  providers: [
    AirportService,
    { provide: Logger, useFactory: () => new Logger('AirportModule') },
  ],
  imports: [
    ClientsModule.register([
      {
        name: 'AIRPORT_SERVICE',
        transport: Transport.TCP,
        options: { port: 4000 },
      },
    ]),
  ],
  exports: [AirportService],
})
export class AirportModule {}
