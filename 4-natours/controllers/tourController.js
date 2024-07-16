const path = require('node:path')
const fs = require('node:fs')

const filePath = path.resolve(__dirname, '../dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

// Param middleware function
const checkID = (req, res, next, val) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  // If the current middleware function does not end the request-response cycle,
  // it must call next() to pass control to the next middleware function.
  // Otherwise, the request will be left hanging.
  next()
}

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price properties' })
  }

  next()
}

// Using JSend specification to send the response
// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: tours,
    },
  })
}

const getTour = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === id)

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = { ...req.body, id: newId }

  tours.push(newTour)
  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    res.status(201).json({ status: 'success', data: { tour: newTour } })
  })
}

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour goes here...>',
    },
  })
}

const deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null })
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
}
