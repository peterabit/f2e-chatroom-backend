import { Context } from 'koa'
import { UserEntity } from 'src/entities/user'
import { UserService } from './user.service'

export class UserController {
  userService = new UserService()

  async register(ctx: Context) {
    const { account, password, name, avatar } = ctx.request.body as Pick<
      UserEntity,
      'account' | 'name' | 'avatar' | 'password'
    >

    const user = await this.userService.register({
      account,
      password,
      name,
      avatar,
    })

    ctx.body = JSON.stringify(user)
  }

  login(): void {}
}
