const EventEmitter = require('node:events')

const eventEmitter = new EventEmitter()

eventEmitter.on('error', (err) => {
  console.error(`error occurred: ${err.message}`)
})

eventEmitter.emit('error', new Error('something went wrong'))
