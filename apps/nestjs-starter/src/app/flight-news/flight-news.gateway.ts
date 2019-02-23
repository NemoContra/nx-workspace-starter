import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  @SubscribeMessage('flightNews')
  getLatestFlightNews(): Observable<WsResponse<string>> {
    return this.flightNewsService
      .getFlightNews()
      .pipe(map((flightNews) => ({ event: 'flightNews', data: flightNews })));
  }

  pushLatestFlightNews(): void {
    this.flightNewsService
      .getFlightNews()
      .subscribe((flightNews) => this.server.emit('flightNews', flightNews));
  }
}
