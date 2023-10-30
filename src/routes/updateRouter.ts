import { Router } from 'express'

const updateRouter = Router()

updateRouter.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Get all updates' })
})

updateRouter.get('/:id', async (req, res) => {})

updateRouter.post('/', async (req, res) => {})

updateRouter.put('/:id', async (req, res) => {})

updateRouter.delete('/:id', async (req, res) => {})

export default updateRouter
