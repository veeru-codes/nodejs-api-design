import { Router } from 'express'
import { body } from 'express-validator'

const updatepointRouter = Router()

updatepointRouter.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Get all update points' })
})

updatepointRouter.get('/:id', async (req, res) => {})

updatepointRouter.post(
  '/',
  body(['name', 'description', 'updateId']).exists().isString(),
  async (req, res) => {}
)

updatepointRouter.put(
  '/:id',
  body(['name', 'description']).optional().isString(),
  async (req, res) => {}
)

updatepointRouter.delete('/:id', async (req, res) => {})

export default updatepointRouter
