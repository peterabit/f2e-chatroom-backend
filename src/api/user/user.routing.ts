import Router from 'koa-router'
import { loginGuard } from 'src/core/guard/login-guard'
import { UserController } from './user.controller'

const userRouter = new Router()

const userController = new UserController()

userRouter.get('/', loginGuard, async (ctx, next) => {
  await userController.getUserInfo(ctx)
})

userRouter.post('/register', async (ctx, next) => {
  await userController.register(ctx)
})

userRouter.post('/login', async (ctx, next) => {
  await userController.login(ctx)
})

export { userRouter }
