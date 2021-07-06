/* eslint-disable node/no-callback-literal */
import { Namespace, Socket } from 'socket.io'
import { ChatMessage } from 'src/entities/chat'
import { ChatMessageModel } from 'src/models/chat-message.model'

export interface UserInfo {
  name: string
  avatar: string
}

export interface MessageDto {
  content: string
}

const users = new Map<string, UserInfo>()

export class ChatController {
  private io: Namespace

  get socket(): Socket {
    if (this._socket) {
      return this._socket
    } else {
      throw new Error('socket not found')
    }
  }

  private _socket?: Socket

  private msgModel = new ChatMessageModel()

  constructor(nIo: Namespace) {
    this.io = nIo
  }

  connection(socket: Socket): void {
    this._socket = socket
  }

  disconnect(): void {
    users.delete(this.socket.id)
    this.io.to('chatroom').emit('user_list', arrayUserList())
  }

  userList(): void {
    this.io.to('chatroom').emit('user_list', arrayUserList())
  }

  join(
    userInfo: Omit<UserInfo, 'id'>,
    callback?: (res: { success: boolean }) => void
  ): void {
    users.set(this.socket.id, userInfo)
    this.socket.join('chatroom')
    callback?.({ success: true })

    this.io.to('chatroom').emit('user_list', arrayUserList())
  }

  async getRecords(callback: (res: { messages: MessageDto[] }) => void) {
    const recordMsgs = await this.msgModel.getAll()
    callback({ messages: recordMsgs })
  }

  async message(msg: MessageDto): Promise<void> {
    const msgInput = messageEntityTranform(this.socket.id, msg)
    if (msgInput) {
      const result = await this.msgModel.insert(msgInput)
      this.io.to('chatroom').emit('message', result)
    }
  }
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
