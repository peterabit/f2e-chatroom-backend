import Router from 'koa-router'
import { UserController } from './user.controller'

const userRouter = new Router()

const userController = new UserController()

userRouter.get('/', async (ctx, next) => {})

userRouter.post('/', async (ctx, next) => {
  await userController.register(ctx)
})

export { userRouter }
