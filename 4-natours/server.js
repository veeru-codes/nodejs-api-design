const mongoose = require('mongoose')

// This has to be at the top
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

require('dotenv').config()

const app = require('./app.js')
const PORT = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection successful!'))

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shuttinh down...')
  console.log(err.name, err.message)

  server.close(() => {
    process.exit(1)
  })
})
