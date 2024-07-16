const dotenv = require('dotenv')
dotenv.config()

const app = require('./app.js')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
