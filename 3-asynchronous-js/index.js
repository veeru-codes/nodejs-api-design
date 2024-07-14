const fs = require('node:fs')
const superagent = require('superagent')

// Example for Callback Hell

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   console.log(`Breed: ${data}`)
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body)
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message)
//         console.log('Random dog image save to file.')
//       })
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
// })

// Building Promises
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err)
      resolve('Random dog image saved to file')
    })
  })
}

// Consuming promises with .then()

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(data)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((res) => {
//     console.log(res.body)
//     return writeFilePromise('dog-img.txt', res.body.message)
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// Consuming promises with async/await

const getDogPic = async () => {
  try {
    const breedData = await readFilePromise(`${__dirname}/dog.txt`)
    console.log(breedData)

    const imgData = await superagent.get(
      `https://dog.ceo/api/breed/${breedData}/images/random`
    )
    console.log(imgData.body.message)

    const successResponse = await writeFilePromise(
      'dog-img.txt',
      imgData.body.message
    )
    console.log(successResponse)
  } catch (err) {
    console.log(err.message)
  }
}

getDogPic()
