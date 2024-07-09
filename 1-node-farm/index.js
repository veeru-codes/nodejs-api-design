const http = require('node:http')

const server = http.createServer((req, res) => {
  res.end('Hello from the http server!')
})

server.listen(8080, () => {
  console.log('Server running at port 8080...')
})
