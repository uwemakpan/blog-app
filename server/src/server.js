const http = require('http')
const app = require('./app')
const httpServer = http.createServer(app)
const dbConnect = require('./lib/helpers/dbconfig')
const { PORT } = require('./lib/index')

const startServer = async () => {
  await dbConnect()
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

startServer()
