import { getReasonPhrase } from 'http-status-codes'
import { Context } from 'koa'
import { AppConfig } from 'src/app.config'
import { AppError } from '../types/error/app-error'

export const appErrorHandler = async (ctx: Context, next: any) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      console.log(err.stack)
      ctx.status = err.status
      ctx.body = JSON.stringify({
        message: err.isPublic ? err.message : getReasonPhrase(err.status),
        stack: AppConfig.env === 'development' ? err.stack : {},
      })
    } else {
      throw err
    }
  }
}
