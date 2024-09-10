const AppError = require('../utils/appError.js')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`

  // 400 Bad Request: Server would not process the request due to a client error,
  // such as malformed request syntax or invalid request message
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  // Earlier the keyValue property was not there. It was recently added.
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`

  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  console.log(err.message)
  return new AppError(err.message, 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    // Programming or other unknown error: don't leak error details
  } else {
    // 1. Log error
    console.log('Error 💥')

    // 2. send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

const globalErrorHandler = (err, req, res, next) => {
  // Status code - 500 - Internal server error
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    // This does not copies the name and message properties
    // This is due to how the spread operator ({ ... err }) works in JS.
    // The spread operator only copies the enumerable own properties of an object.
    // Properties like name and message of an Error object are not enumerable,
    // so they don't get copied when you use the spread operator.
    // let error = { ...err }

    // To ensure that all properties, including non-enumerable ones, are copied,
    // you can use a more comprehensive approach to clone the error object.
    // One common method is to use Object.assign or to manually copy the properties

    // 1. Object.assign:
    // let error = Object.assign({}, err, { name: err.name, message: err.message })

    // 2. Manully copying
    let error = { ...err, name: err.name, message: err.message }

    // Handling invalid database IDs
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    }

    // Handling duplicate database fields
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error)
    }

    // Handling Mongoose validation errors
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error)
    }
    sendErrorProd(error, res)
  }
}

module.exports = globalErrorHandler
