const catchAsync = (fn) => {
  // The arrow function returns another function, which is a middleware function in the context of an Express.js application.
  // This middleware function takes three parameters: req (the request object), res (the response object), and next (a callback function to pass control to the next middleware).
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = catchAsync
