import * as dotenv from 'dotenv'
dotenv.config()
import app from './server'
import config from './config'

const PORT = config.port || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
