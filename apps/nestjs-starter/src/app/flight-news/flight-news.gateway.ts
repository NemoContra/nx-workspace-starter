import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { FlightNewsService } from './flight-news.service';
import * as SocketIO from 'socket.io';

@WebSocketGateway()
export class FlightNewsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: SocketIO.Server;

  constructor(private readonly flightNewsService: FlightNewsService) { }

  // This is the init Lifecycle hook
  afterInit(server: SocketIO.Server): any { }

  // This Lifecycle hook is invoked when a new client connects
  handleConnection(client: SocketIO.Socket, ...args: any[]): any { }

  // This Lifecycle hook is invoked when a connected client disconnects
  handleDisconnect(client: SocketIO.Socket): any { }
}
