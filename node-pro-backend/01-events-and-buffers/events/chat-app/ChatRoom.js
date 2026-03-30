const EventEmitter = require('node:events')

class ChatRoom extends EventEmitter {
  constructor() {
    super()
    this.users = new Set()
  }

  join(user) {
    this.users.add(user)
    this.emit('join', user)
  }

  sendMessage(user, message) {
    if (this.users.has(user)) {
      this.emit('message', user, message)
    } else {
      console.log(`${user} is not in the chat room`)
    }
  }

  leave(user) {
    if (this.users.has(user)) {
      this.emit('leave', user)
      this.users.delete(user)
    } else {
      console.log(`${user} left the chat room`)
    }
  }
}

module.exports = ChatRoom
