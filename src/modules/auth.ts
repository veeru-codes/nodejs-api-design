import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPasword = (password) => {
  return bcrypt.hash(password, 10)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )

  return token
}

export const protect = (req, res, next) => {
  // Get the authorization headers
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401).json({ message: 'User not authorized' })
    return
  }

  // Extract the token
  const token = bearer.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  // Verify the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    res.status(401).json({ message: 'Not a valid token' })
    return
  }
}
