import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');
  constructor() {
    this.logger.log('constructor');
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    //클라이언트랑 소켓이 새로 연결되어야지 실행되는 함수
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }
  afterInit() {
    //게이트웨이가 실행될 때 가장 먼저 실행되는 함수
    this.logger.log('init');
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    //클라이언트랑 소켓 연결이 끊기고 나서 실행되는 함수
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // username db에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('new_chat', {
      chat,
      username: socket.id,
    });
  }
}
