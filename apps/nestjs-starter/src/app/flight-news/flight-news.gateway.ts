import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FlightNewsService } from './flight-news.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class FlightNewsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly flightNewsService: FlightNewsService,
    private readonly logger: Logger
  ) {}

  afterInit(server: Server): any {
    this.logger.log('Flight news gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Handle connection for socket ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Handle disconnect for socket ${client.id}`);
  }
}
