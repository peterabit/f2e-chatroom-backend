import { Context } from 'koa'
import { Socket } from 'socket.io'

export const ioWrapper =
  (middleware: Function) => async (socket: Socket, next: Function) => {
    const token = socket.handshake.auth.token

    if (token) {
      (socket.request as any as Context).header.Authorization = token
    }

    try {
      await middleware(
        { ...socket.request, header: socket.request.headers },
        next
      )
    } catch (error) {
      next(error)
    }
  }
