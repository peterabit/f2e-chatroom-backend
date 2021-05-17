/* eslint-disable node/no-callback-literal */
import { Namespace, Socket } from 'socket.io'
import { ChatMessage } from 'src/entities/chat'
import { ChatMessageModel } from 'src/models/chat-message.model'

interface UserInfo {
  name: string
  avatar: string
}

interface MessageDto {
  content: string
}

const users = new Map<string, UserInfo>()

export const chatController = (nIo: Namespace) => {
  nIo.on('connection', (socket: Socket) => {
    const chatMessageModel = new ChatMessageModel()
    socket
      .on(
        'get_records',
        async (callback: (res: { messages: MessageDto[] }) => void) => {
          const recordMsgs = await chatMessageModel.getAll()
          callback({ messages: recordMsgs })
        }
      )
      .on('message', async (msg: MessageDto) => {
        const msgInput = messageEntityTranform(socket.id, msg)
        if (msgInput) {
          const result = await chatMessageModel.insert(msgInput)
          nIo.to('chatroom').emit('message', result)
        }
      })
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
          socket.join('chatroom')

          callback?.({ success: true })

          nIo.to('chatroom').emit('user_list', arrayUserList())
        }
      )
      .on('disconnect', () => {
        users.delete(socket.id)
        nIo.to('chatroom').emit('user_list', arrayUserList())
      })
  })
}

function messageEntityTranform(
  ownerId: string,
  msg: MessageDto
): Omit<ChatMessage, 'id'> | undefined {
  const user = users.get(ownerId)

  if (user) {
    return {
      owner: ownerId,
      name: user.name,
      avatar: user.avatar,
      content: msg.content,
    }
  }
}

function arrayUserList() {
  return Array.from(users, ([id, info]) => ({ ...info, id }))
}
