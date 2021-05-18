import { AccountDuplicateError } from 'src/core/error/register'
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

  login(): void {}
}
