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
  console.log('Database connection successful')
})

mongoose.connection.on('error', error => {
  console.log(`Database connection error: ${error.message}`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected')
})

process.on('SIGINT', async () => {
  // отслеживаем нажатие Ctrl+c
  mongoose.connection.close(() => {
    console.log('Disconnect MongoDB')
    process.exit(1)
  })
})

module.exports = db
