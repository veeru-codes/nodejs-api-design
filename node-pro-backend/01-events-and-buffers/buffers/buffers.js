const { Buffer } = require('node:buffer')

const buff = new Buffer.alloc(4) // <Buffer 00 00 00 00>

const buff2 = Buffer.from('hello chai') // <Buffer 68 65 6c 6c 6f 20 63 68 61 69>
buff2.toString() // hello chai

// unsafe because of uninitialized memory
// WARN: never user this to allocate memory
const buff3 = Buffer.allocUnsafe(110)

const buff4 = Buffer.from('chai aur code') // <Buffer 63 68 61 69 20 61 75 72 20 63 6f 64 65>
buff.toString() // chai aur code
buff4.toString('utf-8', 0, 4) // chai

const buff5 = Buffer.from('chai') // <Buffer 63 68 61 69>
buff5[0] = 0x4a // <Buffer 4a 68 61 69>
console.log(buff5.toString()) // Jhai

const buff6 = Buffer.from('veerendranath')
const buff7 = Buffer.from(' reddy')
const merged = Buffer.concat([buff6, buff7])
merged.toString() // veerendranath reddy
merged.length // 19
