import { Server } from 'socket.io'
import { chatController } from './chat/chat.controller'

export const rotuer = (io: Server) => {
  chatController(io.of('/chat'))
}
