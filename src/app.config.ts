import path from 'path'

export const AppConfig = {
  staticPath: path.join(__dirname, 'public'),
  httpPort: process.env.HTTP_PORT || 3000,
  httpsPort: process.env.HTTPS_PORT || 3001,
  uploadDir: path.join(__dirname, 'resources/temp'),
}
