import 'reflect-metadata'
import Koa from 'koa'
import staticServe from 'koa-static'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import { AppConfig } from 'src/app.config'
import { router } from './app.routing'
import { appErrorHandler } from './core/middleware/app-error-handler'

const app = new Koa()

app.use(appErrorHandler)

app.use(logger())

app.use(cors())

const bodyOptions: koaBody.IKoaBodyOptions = {
  multipart: true,
  formidable: {
    uploadDir: AppConfig.uploadDir,
    keepExtensions: true,
  },
}
app.use(koaBody(bodyOptions))

app.use(staticServe(AppConfig.staticPath))

app.use(router.routes()).use(router.allowedMethods())

export { app }
