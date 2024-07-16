const express = require('express')
const morgan = require('morgan')
const toursRouter = require('./routes/tourRoutes.js')
const usersRouter = require('./routes/userRoutes.js')

const app = express()

// Middlewares
app.use(express.json()) // To parse incoming JSON data
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // Third party middleware
}
app.use(express.static(`${__dirname}/public`)) // To serve static files

// Custom Middleware
app.use((req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)

  next()
})

app.use('/api/v1/tours', toursRouter)
app.use('/api/v1/users', usersRouter)

module.exports = app
