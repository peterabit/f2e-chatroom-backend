/* eslint-disable node/no-callback-literal */
import { Namespace, Socket } from 'socket.io'
import { ChatController, MessageDto, UserInfo } from './chat.controller'

export const chatController = (nIo: Namespace) => {
  const chatController = new ChatController(nIo)

  nIo.on('connection', (socket: Socket) => {
    chatController.connection(socket)
    socket
      .on(
        'get_records',
        (callback: (res: { messages: MessageDto[] }) => void) => {
          chatController.getRecords(callback)
        }
      )
      .on('message', async (msg: MessageDto) => {
        chatController.message(msg)
      })
      .on('user_list', () => {
        chatController.userList()
      })
      .on(
        'join',
        (
          userInfo: Omit<UserInfo, 'id'>,
          callback?: (res: { success: boolean }) => void
        ) => {
          chatController.join(userInfo, callback)
        }
      )
      .on('disconnect', () => {
        chatController.disconnect()
      })
  })
}
