import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
	cors: {
		origin: process.env.CORS_ORIGIN || '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization']
	}
})
export class PostGateway {
	@WebSocketServer()
	server: Server

	notifyAdmin(postId: number) {
		const message = `доведен, все ознакомились`

		this.server.emit('postSigned', {
			postId: postId,
			message: message
		})
	}
}
