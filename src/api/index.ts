import Router from 'koa-router'
import { userRouter } from './user/user.routing'

const apiRouter = new Router()

apiRouter.use('/user', userRouter.routes())

export { apiRouter }
