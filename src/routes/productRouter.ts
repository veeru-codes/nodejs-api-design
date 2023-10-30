import { Router } from 'express'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Get all products' })
})

productRouter.get('/:id', async (req, res) => {})

productRouter.post('/', async (req, res) => {})

productRouter.put('/:id', async (req, res) => {})

productRouter.delete('/:id', async (req, res) => {})

export default productRouter
