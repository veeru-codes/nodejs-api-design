import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../handlers/product'

const productRouter = Router()

productRouter
  .route('/')
  .get(getProducts)
  .post(body('name'), handleInputErrors, createProduct)

productRouter
  .route('/:id')
  .get(getProductById)
  .put(body('name'), handleInputErrors, updateProductById)
  .delete(deleteProductById)

// productRouter.get('/', getProducts)
// productRouter.post('/', body('name'), handleInputErrors, createProduct)

// productRouter.get('/:id', getProductById)
// productRouter.put('/:id', body('name'), handleInputErrors, updateProductById)
// productRouter.delete('/:id', deleteProductById)

export default productRouter
