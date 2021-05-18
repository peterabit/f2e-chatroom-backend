import { Server } from 'socket.io'
import { chatController } from './chat/chat.routing'

export const rotuer = (io: Server) => {
  chatController(io.of('/chat'))
}
