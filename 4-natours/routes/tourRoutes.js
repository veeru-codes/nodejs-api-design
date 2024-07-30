const express = require('express')
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController.js')

const toursRouter = express.Router()

// Param Middleware
// toursRouter.param('id', checkID)

toursRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)
toursRouter.route('/tour-stats').get(getTourStats)
toursRouter.route('/monthly-plan/:year').get(getMonthlyPlan)

toursRouter.route('/').get(getAllTours).post(createTour)
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = toursRouter
