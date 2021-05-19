import { Socket } from 'socket.io'

export const ioWrapper =
  (middleware: Function) => async (socket: Socket, next: Function) => {
    try {
      await middleware(
        { ...socket.request, header: socket.request.headers },
        next
      )
    } catch (error) {
      next(error)
    }
  }
