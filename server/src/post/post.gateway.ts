import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway()
export class PostGateway {
	@WebSocketServer()
	server: Server

	notifyAdmin(postId: number) {
		this.server.emit('postSigned', { postId })
	}
}
