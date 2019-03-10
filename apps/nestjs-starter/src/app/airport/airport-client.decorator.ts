import { Client, Transport } from '@nestjs/microservices';

export const AirportClient = () => Client({
  transport: Transport.TCP,
  options: {
    port: 4000
  }
});
