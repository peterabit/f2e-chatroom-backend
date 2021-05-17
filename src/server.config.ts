import path from 'path'

export const ServerConfig = {
  sslKey: path.join(__dirname, 'ssl/server.key'),
  sslCert: path.join(__dirname, 'ssl/server.crt'),
}
