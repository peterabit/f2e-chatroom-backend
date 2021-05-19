import { Context } from 'koa'
import { createResponse } from 'src/core/helper/create-response'
import { LoginPayload } from 'src/core/types/login-payload'
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

  async login(ctx: Context) {
    const { account, password } = ctx.request.body
    const token = await this.userService.login(account, password)
    ctx.body = createResponse('登入成功', { token })
  }

  async getUserInfo(ctx: Context): Promise<void> {
    const payload = ctx.tokenPayload as LoginPayload
    const userInfo = await this.userService.getUserInfo(payload.userId)
    ctx.body = createResponse('', userInfo)
  }
}
