import bcrypt from 'bcrypt'
import { InsertReturn } from 'src/core/types/query'
import { mariadbPool } from 'src/database/database'
import { UserEntity } from 'src/entities/user'

export class UserModel {
  async create(
    userData: Pick<UserEntity, 'account' | 'name' | 'avatar' | 'password'>
  ): Promise<UserEntity> {
    const connection = await mariadbPool.connect()

    const { account, name, avatar, password } = userData

    const pwdHash = await this.hashPassword(password)

    const result = (await connection.query(
      `INSERT INTO test.users (account, name, avatar, password) VALUES ('${account}', '${name}', '${avatar}', '${pwdHash}')`
    )) as InsertReturn

    const user = await this.getById(result.insertId)

    await connection.end()

    return user
  }

  async getById(id: number): Promise<UserEntity> {
    const connection = await mariadbPool.connect()

    const user = (await connection.query(
      `SELECT * FROM test.users WHERE id = '${id}'`
    )) as UserEntity[]

    await connection.end()

    return { ...user[0] }
  }

  async getByAccount(account: string): Promise<UserEntity> {
    const connection = await mariadbPool.connect()

    const user = (await connection.query(
      `SELECT * FROM test.users WHERE account = '${account}'`
    )) as UserEntity[]

    await connection.end()

    return user[0]
  }

  private async hashPassword(originPassword: string) {
    const saltRounds = 12
    const hash = await bcrypt.hash(originPassword, saltRounds)

    return hash
  }
}
