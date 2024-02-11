import { Logger, OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GetDataGateWay implements OnModuleInit {
  constructor() {
    this.server = new Server(); // Yeni bir socket.io sunucusu oluşturun
  }

  afterInit(server: Server) {
    Logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getData')
  onNewMessage(@MessageBody() body: { sender: string; content: string }) {
    this.server.emit('listenMessage/' + body.sender, {
      ...body,
      createdAt: new Date(), // Yeni createdAt özelliği
    });
  }
}
