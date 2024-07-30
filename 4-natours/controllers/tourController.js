const Tour = require('../models/tour.js')
const APIFeatures = require('../utils/apiFeatures.js')

// Using JSend specification to send the response
// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

const getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const tours = await features.query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

const getTour = async (req, res) => {
  try {
    // Behind The Scenes: Tour.findOne({ _id: req.params.id })
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

const createTour = async (req, res) => {
  try {
    // Method 1
    // const newTour = new Tour(req.body)
    // newTour.save()

    // Method 2
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      statu: 'fail',
      message: error.message,
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRatings: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
      // { $match: { _id: { $ne: 'EASY' } } },
    ])

    res.status(200).json({ status: 'success', data: { stats } })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

const getMonthlyPlan = async (req, res) => {
  try {
    const year = Number(req.params.year)

    const plan = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      // {
      //   $limit: 12,
      // },
    ])

    res.status(200).json({ status: 'success', data: { plan } })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
}
