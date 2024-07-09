const fs = require('node:fs')
const server = require('node:http').createServer()

server.on('request', (req, res) => {
  // Solution 1
  // With this solution, Node.js has to load all the data at a time into the memory
  // fs.readFile('./test-file.txt', (err, data) => {
  //   if (err) console.log(err.message)
  //   res.end(data)
  // })
  // Solution 2
  // const readable = fs.createReadStream('./test-file.txt')
  // readable.on('data', (chunk) => res.write(chunk))
  // readable.on('end', () => res.end())
  // readable.on('error', (err) => {
  //   console.log(err.message)
  //   res.statusCode(500).end('File not found!')
  // })
  // Solution 3
  const readable = fs.createReadStream('./test-file.txt')
  readable.pipe(res)
  // readableStream.pipe(writableDestination)
})

server.listen(8080, () => {
  console.log(`Server listening on port 8080...`)
})
