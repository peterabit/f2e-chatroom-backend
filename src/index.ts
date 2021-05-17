import https from 'https'
import http from 'http'
import fs from 'fs'
import { Server } from 'socket.io'
import { app } from './app'
import { AppConfig } from 'src/app.config'
import { ServerConfig } from './server.config'
import { rotuer } from './websocket/index.'

const server = app.callback()

const httpServer = http.createServer(server)

const ioOptions = {
  serveClient: false,
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
}
const io = new Server(httpServer, ioOptions)
rotuer(io)

// launch server
httpServer.listen(AppConfig.httpPort, () => {
  console.log('http', AppConfig.httpPort)
})

const httpsOptions = {
  key: fs.readFileSync(ServerConfig.sslKey),
  cert: fs.readFileSync(ServerConfig.sslCert),
}
https.createServer(httpsOptions, server).listen(AppConfig.httpsPort, () => {
  console.log('https', AppConfig.httpsPort)
})
