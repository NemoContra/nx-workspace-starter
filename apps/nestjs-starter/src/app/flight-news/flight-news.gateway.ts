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

@WebSocketGateway()
export class FlightNewsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly flightNewsService: FlightNewsService) {}

  // This is the init Lifecycle hook
  afterInit(server: Server): any {}

  // This Lifecycle hook is invoked when a new client connects
  handleConnection(client: Socket, ...args: any[]): any {}

  // This Lifecycle hook is invoked when a connected client disconnects
  handleDisconnect(client: Socket): any {}

  // This is invoked when the client sends a request for flightNews (e.g. after startup of the application)
  @SubscribeMessage('flightNews')
  getLatestFlightNews(): Observable<WsResponse<string>> {
    return this.flightNewsService
      .getFlightNews()
      .pipe(map((flightNews) => ({ event: 'flightNews', data: flightNews })));
  }

  // This can be called by injecting FlightNewsGateway anywhere at any time
  pushLatestFlightNews(): void {
    this.flightNewsService
      .getFlightNews()
      .subscribe((flightNews) => this.server.emit('flightNews', flightNews));
  }
}
