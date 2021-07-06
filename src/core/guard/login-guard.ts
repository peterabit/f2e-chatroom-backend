import { verify } from 'jsonwebtoken'
import { Context } from 'koa'
import { TOKEN_SECRET_KEY } from '../constant/secret-key'
import { NotLoginError, JWTError } from '../types/error/errors'

export const loginGuard = async (ctx: Context, next: any) => {
  let bearerToken = ctx.header.Authorization

  if (!bearerToken || typeof bearerToken !== 'string') {
    throw new NotLoginError()
  } else {
    bearerToken = bearerToken.split(' ')[1]
    try {
      const payload = verify(bearerToken, TOKEN_SECRET_KEY)
      ctx.tokenPayload = payload
    } catch (error) {
      throw new JWTError(error.message)
    }

    await next()
  }
}
