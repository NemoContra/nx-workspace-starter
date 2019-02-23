import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AirportController],
  providers: [AirportService],
  imports: [
    ClientsModule.register([
      { name: 'CLIENT', transport: Transport.TCP, options: { port: 4000 } },
    ]),
  ],
  exports: [AirportService],
})
export class AirportModule {}
