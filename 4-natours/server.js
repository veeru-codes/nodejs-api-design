const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = require('./app.js')
const PORT = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection successful!'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
