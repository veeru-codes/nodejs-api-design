class AppError extends Error {
  constructor(message, statusCode) {
    // Invokes the constructor of the parent Error class, passing the message
    // parameter to it. This sets the message property of the error object.
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    // Sets the isOperational property to true, indicating that
    // this error is operational and expected. This can be useful for
    // distinguishing between operational errors and programming errors.
    this.isOperational = true

    // Error.captureStackTrace(targetObject[, constructor])
    // When you call Error.captureStackTrace(), it captures the current call stack
    // and assigns it to the stack property of the targetObject. This stack trace includes
    // information about the sequence of function calls that led to the error,
    // which can help you understand where and why the error occurred.
    // Benifits: Improved debugging, Custom error handling
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
