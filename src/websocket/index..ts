import { verify } from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from './../core/constant/secret-key'
import { NotLoginError, JWTError } from './../core/types/error/errors'
import { Server, Socket } from 'socket.io'
import { chatController } from './chat/chat.routing'

function loginGuard(socket: Socket, next: Function) {
  const bearerToken = socket.handshake.auth.token

  if (!bearerToken || typeof bearerToken !== 'string') {
    throw new NotLoginError()
  } else {
    try {
      const payload = verify(bearerToken, TOKEN_SECRET_KEY)
      socket.handshake.auth.tokenPayload = payload

      next()
    } catch (error) {
      throw new JWTError(error.message)
    }
  }
}

export const rotuer = (io: Server) => {
  const chatIo = io.of('/chat')

  chatIo.use(loginGuard)

  chatController(chatIo)
}
