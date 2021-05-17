import { Namespace, Socket } from 'socket.io'

interface UserInfo {
  name: string
  avatar: string
}

interface Message {
  owner: string
  msg: string
}

const users = new Map<string, UserInfo>()

export const chatController = (nIo: Namespace) => {
  nIo.on('connection', (socket: Socket) => {
    socket
      .on('message', (msg: Message) => {
        nIo.to('chatroom').emit('message', { ...msg, id: socket.id })
      })
      .on(
        'private_message',
        (
          data: { userId: string; msg: Message },
          callback?: (res: { success: boolean }) => void
        ) => {
          const { userId, msg } = data
          socket.to(userId).emit('private_message', msg)
          // eslint-disable-next-line node/no-callback-literal
          callback?.({ success: true })
        }
      )
      .on('user_list', () => {
        nIo.to('chatroom').emit('user_list', arrayUserList())
      })
      .on(
        'join',
        (
          userInfo: Omit<UserInfo, 'id'>,
          callback?: (res: { success: boolean }) => void
        ) => {
          users.set(socket.id, userInfo)
          console.log(socket.id)
          socket.join('chatroom')
          nIo.to('chatroom').emit('user_list', arrayUserList())
          // eslint-disable-next-line node/no-callback-literal
          callback?.({ success: true })
        }
      )
      .on('disconnect', () => {
        users.delete(socket.id)
        nIo.to('chatroom').emit('user_list', arrayUserList())
      })
  })
}

function arrayUserList() {
  return Array.from(users, ([id, info]) => ({ ...info, id }))
}
