require('dotenv').config()
const fs = require('node:fs')
const mongoose = require('mongoose')
const Tour = require('../../models/tour.js')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
)

// Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded')
  } catch (error) {
    console.log(error.message)
  }

  process.exit()
}

// Delete all data from DB collection
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (error) {
    console.log(error.message)
  }

  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
