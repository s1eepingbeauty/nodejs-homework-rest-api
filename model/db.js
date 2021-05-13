const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // индекс нужен для ускоренного поиска, но создание новых записей может происходить дольше
  poolSize: 5,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', error => {
  console.log(`Mongoose connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  // отслеживаем нажатие Ctrl+c
  mongoose.connection.close(() => {
    console.log('Disconnect MongoDB')
    process.exit(1)
  })
})

module.exports = db
