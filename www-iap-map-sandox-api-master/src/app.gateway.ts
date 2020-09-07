import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer } from '@nestjs/websockets'
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {
    this.logger.log('Initialized')
  }

  handleDisconnect(client: Socket) {
    // throw new Error('Method not implemented');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // throw new Error(`client connected: ${clinet}`)
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: String): WsResponse<String> {
    //   client.emit('msgToClient', text)
    console.error('rcv msg from fr', text )
    return { event: 'msgToClient', data: text }
  }

  sendMessageToClient(data:any) {
      console.error('send to client', data)
    return { event: 'sendToClient', data}
}
}


