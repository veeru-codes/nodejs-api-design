const EventEmitter = require('node:events')

const myEventEmitter = new EventEmitter()

myEventEmitter.on('greet', (username) => {
  console.log(`Hello ${username} and welcome to events in node js`)
})

myEventEmitter.on('greet', (username) => {
  console.log(`Hey ${username} and node js is here`)
})

myEventEmitter.once('pushnotify', () => {
  console.log('This event will run only once')
})

// emit the event
myEventEmitter.emit('greet', 'veer')
myEventEmitter.emit('pushnotify')

// this will not be invoked
myEventEmitter.emit('pushnotify')

const callback = () => {
  console.log('I am a callback function')
}

myEventEmitter.on('removetest', callback)

myEventEmitter.emit('removetest')
myEventEmitter.emit('removetest')
myEventEmitter.removeListener('removetest', callback)

// as the 'removetest' event is removed,
// the following line of code will not be invoked
myEventEmitter.emit('removetest')
