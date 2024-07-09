const EventEmitter = require('events')
const http = require('node:http')

const myEmitter = new EventEmitter()

myEmitter.on('newSale', () => {
  console.log('There was a sale!')
})

myEmitter.on('newSale', () => {
  console.log('Customer name: Veerendra')
})

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`)
})

myEmitter.emit('newSale', 6)

// --------------------------------------- //

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('Request received')
  res.end('Request received')
})

server.on('close', () => {
  console.log('Server closed')
})

server.listen(8080, () => {
  console.log('Waiting for requests on port 8080...')
})
