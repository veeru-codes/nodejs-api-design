const fs = require('fs')

// Synchronous way of reading files
// Blocking code execution

const dataIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log('File read!')
const dataOut = `This is what we know about the avocado: ${dataIn}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', dataOut)
console.log('File written!')

// Asynchronous way of reading files
// Non-blocking code execution

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  console.log('Data1: ', data1)
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log('Data2: ', data2)
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('Your file has been written 😄')
      })
    })
  })
})

console.log('Reading and Writing file...')
