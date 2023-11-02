import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() })
    return
  } else {
    next()
  }
}
