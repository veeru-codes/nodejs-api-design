const express = require('express')

const app = express()
const PORT = 8000

// middleware
app.use(express.json())

// endpoints
app.get('/', (req, res) => {
  res.status(200).end('homepage')
})

app.get('/contact-us', (req, res) => {
  res.status(200).end('you can contact me at my email address')
})

app.get('/tweets', (req, res) => {
  res.status(200).json([{ tweet1: '' }, { tweet2: '' }])
})

app.post('/tweets', (req, res) => {
  res.status(201).end('tweet created successfully')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
