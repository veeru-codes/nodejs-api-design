// console.log(arguments)
// console.log(require('module').wrapper)

// module.exports
const Calculator = require('./test-moudle-1.js')

const calc1 = new Calculator()
console.log(calc1.add(1, 2))

// exports
const { add, multiply, divide } = require('./test-module-2.js')
console.log(multiply(2, 10))
