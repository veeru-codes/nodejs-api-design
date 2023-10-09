const express = require('express')

const app = express()

app.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Hello from Express.js' })
})

module.exports = app
