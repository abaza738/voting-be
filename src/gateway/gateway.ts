import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnModuleInit {

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected');
            console.log(socket.id);
        });
    }

    @SubscribeMessage('registerUser')
    onRegisterUser(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('onRegister', { success: true });
    }
}