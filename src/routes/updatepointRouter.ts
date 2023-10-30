import { Router } from 'express'

const updatepointRouter = Router()

updatepointRouter.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Get all update points' })
})

updatepointRouter.get('/:id', async (req, res) => {})

updatepointRouter.post('/', async (req, res) => {})

updatepointRouter.put('/:id', async (req, res) => {})

updatepointRouter.delete('/:id', async (req, res) => {})

export default updatepointRouter
