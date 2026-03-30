const EventEmitter = require('node:events')

class Chat extends EventEmitter {
  // sendMessage method emitting an event 'messageReceived'
  sendMessage(msg) {
    console.log(`message sent: ${msg}`)
    this.emit('messageReceived', msg)
  }
}

const chat = new Chat()

chat.on('messageReceived', (msg) => {
  console.log(`new message: ${msg}`)
})

// trigger event
chat.sendMessage('hello veerendra')
