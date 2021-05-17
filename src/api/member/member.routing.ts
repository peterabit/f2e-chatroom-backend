import Router from 'koa-router'
import bcrypt from 'bcrypt'

const memberRouter = new Router()

memberRouter.get('/', async (ctx, next) => {
  const saltRounds = 10
  const myPlaintextPassword = 's0//P4$$w0rD'
  const someOtherPlaintextPassword = 'not_bacon'

  const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds)
  const otherPasswordHash = await bcrypt.hash(
    someOtherPlaintextPassword,
    saltRounds
  )
  console.log(passwordHash === otherPasswordHash)
})

export { memberRouter }
