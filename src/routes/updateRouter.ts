import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
  createUpdate,
  deleteUpdateById,
  getUpdateById,
  getUpdates,
  updateUpdateById,
} from '../handlers/update'

const updateRouter = Router()

updateRouter
  .route('/')
  .get(getUpdateById)
  .post(
    body(['title', 'body', 'productId']).exists().isString(),
    handleInputErrors,
    createUpdate
  )

updateRouter
  .route('/:id')
  .get(getUpdateById)
  .put(
    body(['title', 'body', 'version']).optional(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRICATED', 'ARCHIVED']),
    handleInputErrors,
    updateUpdateById
  )
  .delete(deleteUpdateById)

// updateRouter.get('/', getUpdates)
// updateRouter.get('/:id', getUpdateById)

// updateRouter.post('/', body(['title', 'body', 'productId']).exists().isString(), createUpdate)
// updateRouter.put('/:id', body(['title', 'body', 'version']).optional(), body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRICATED', 'ARCHIVED']), updateUpdateById)
// updateRouter.delete('/:id', deleteUpdateById)

export default updateRouter
