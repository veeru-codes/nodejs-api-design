const express = require('express')
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController.js')

const toursRouter = express.Router()

// Param Middleware
toursRouter.param('id', checkID)

toursRouter.route('/').get(getAllTours).post(checkBody, createTour)
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = toursRouter
