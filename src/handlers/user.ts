import prisma from '../db'
import { comparePassword, createJWT, hashPasword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPasword(req.body.password),
      },
    })

    // Create the jwt token
    const token = createJWT(user)
    res.status(201).json({ token })
  } catch (e) {
    e.type = 'input'
    next(e)
  }
  

  
}

export const signin = async (req, res) => {
  // Get the user by username
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  // Check the user
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  const isValid = await comparePassword(req.body.password, user.password)

  if (!isValid) {
    res.status(401).json({ message: 'User not found' })
    return
  }

  // Create the jwt token
  const token = createJWT(user)
  res.status(200).json({ token })
}
