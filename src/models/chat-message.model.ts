import { mariadbPool } from 'src/database/database'
import { ChatMessage } from 'src/entities/chat'

export class ChatMessageModel {
  async getAll(): Promise<ChatMessage[]> {
    const connection = await mariadbPool.connect()
    const msgRows = await connection.query(
      'SELECT * FROM `test`.`chat_message`'
    )
    await connection.end()

    return [...msgRows] as ChatMessage[]
  }

  async getById(id: number): Promise<ChatMessage> {
    const connection = await mariadbPool.connect()
    const msg = (await connection.query(
      `SELECT * FROM test.chat_message WHERE id = ${id}`
    )) as ChatMessage[]
    await connection.end()
    return { ...msg[0] }
  }

  async insert(msg: Omit<ChatMessage, 'id'>) {
    const connection = await mariadbPool.connect()
    const insertResult = (await connection.query(
      `INSERT INTO \`test\`.\`chat_message\` (\`owner\`, \`name\`, \`avatar\`, \`content\`) VALUES ('${msg.owner}', '${msg.name}', '${msg.avatar}', '${msg.content}');`
    )) as { insertId: any; warningStatus: number }

    const insertMsg = await this.getById(insertResult.insertId)

    await connection.end()

    return insertMsg
  }
}
