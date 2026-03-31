const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  const method = req.method
  const path = req.url

  const log = `${Date.now()}: ${method} ${path}\n`
  fs.appendFileSync('log.txt', log, 'utf-8')

  if (method === 'GET' && path === '/') {
    return res.writeHead(200).end(`hello from server`)
  } else if (method === 'GET' && path === '/contact-us') {
    return res.writeHead(200).end('your@gmail.com')
  } else if (method === 'GET' && path === '/tweet') {
    return res.writeHead(200).end('these are your tweets')
  } else if (method === 'POST' && path === '/tweet') {
    return res.writeHead(201).end('your tweet was created')
  }

  return res.writeHead(404).end('page not found')
})

server.listen(8080, () => {
  console.log(`server is up and running on port 8000...`)
})
