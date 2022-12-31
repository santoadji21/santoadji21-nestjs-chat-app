import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}
  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    console.log(server);
  }
  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: Chat): Promise<void> {
    await this.chatService.createMessage(payload);
    this.server.emit('message', payload);
  }
}
