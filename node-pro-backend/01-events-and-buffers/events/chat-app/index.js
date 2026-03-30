const ChatRoom = require('./ChatRoom.js')

const chat = new ChatRoom()

chat.on('join', (user) => {
  console.log(`${user} joined the chat room`)
})

chat.on('message', (user, message) => {
  console.log(`${user}: ${message}`)
})

chat.on('leave', (user) => {
  console.log(`${user} left the chat room`)
})

chat.join('alice')
chat.join('bob')

chat.sendMessage('alice', 'hey bob, how are you?')
chat.sendMessage('bob', 'hey alice, i am good, how are you?')

chat.leave('alice')
chat.sendMessage('alice', 'are you coming to the party?')

chat.leave('bob')
