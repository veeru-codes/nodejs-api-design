const http = require('http')

const PORT = process.env.PORT || 3001

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.end('Welcome')
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
