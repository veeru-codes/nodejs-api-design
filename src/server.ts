import express from 'express'
import cors from 'cors'
import productRouter from './routes/productRouter'
import updateRouter from './routes/updateRouter'
import updatepointRouter from './routes/updatepointRouter'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use('/api/product', protect, productRouter)
app.use('/api/update', protect, updateRouter)
app.use('/api/updatepoint', protect, updatepointRouter)

export default app
