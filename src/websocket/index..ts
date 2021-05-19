import { Server } from 'socket.io'
import { loginGuard } from 'src/core/guard/login-guard'
import { ioWrapper } from 'src/core/helper/io-wrapper'
import { chatController } from './chat/chat.routing'

export const rotuer = (io: Server) => {
  const chatIo = io.of('/chat')

  chatIo.use(ioWrapper(loginGuard))

  chatController(chatIo)
}
