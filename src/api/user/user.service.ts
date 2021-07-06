import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {
  AccountDuplicateError,
  LoginRefuseError,
} from 'src/core/types/error/errors'
import { TOKEN_SECRET_KEY } from 'src/core/constant/secret-key'
import { UserEntity } from 'src/entities/user'
import { UserModel } from 'src/models/user.model'

export class UserService {
  userModel = new UserModel()

  async register(
    userData: Pick<UserEntity, 'account' | 'name' | 'avatar' | 'password'>
  ) {
    const existUser = await this.userModel.getByAccount(userData.account)

    if (existUser) {
      throw new AccountDuplicateError()
    }

    const { password, ...user } = await this.userModel.create(userData)
    return user
  }

  async login(account: string, password: string): Promise<string> {
    const user = await this.userModel.getByAccount(account)
    if (!user) {
      throw new LoginRefuseError()
    }

    const isPwdCorrect = await compare(password, user.password)

    if (!isPwdCorrect) {
      throw new LoginRefuseError()
    } else {
      const expiresIn = '1d'
      const payload = {
        userId: user.id,
        name: user.name,
        account: user.account,
        expiresIn,
      }
      return sign(payload, TOKEN_SECRET_KEY, { expiresIn })
    }
  }

  async getUserInfo(id: number): Promise<Omit<UserEntity, 'password'>> {
    const { password, ...userInfo } = await this.userModel.getById(id)
    return userInfo
  }
}
