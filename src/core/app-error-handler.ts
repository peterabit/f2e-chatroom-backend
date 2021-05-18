import { getReasonPhrase } from 'http-status-codes'
import { Context } from 'koa'
import { AppConfig } from 'src/app.config'
import { AppError } from './error/app-error'

export const appErrorHandler = async (ctx: Context, next: any) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      ctx.status = err.status
      console.log('env', AppConfig.env)
      console.log(err.stack)
      ctx.body = JSON.stringify({
        message: err.isPublic ? err.message : getReasonPhrase(err.status),
        stack: AppConfig.env === 'development' ? err.stack : {},
      })
    } else {
      ctx.status = 500
      ctx.body = JSON.stringify({
        stack: AppConfig.env === 'development' ? err.stack : {},
      })
    }
  }
}
