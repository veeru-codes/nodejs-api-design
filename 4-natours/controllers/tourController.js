const Tour = require('../models/tour.js')
const APIFeatures = require('../utils/apiFeatures.js')
const AppError = require('../utils/appError.js')
const catchAsync = require('../utils/catchAsync.js')

// Using JSend specification to send the response
// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

// const getAllTours = (req, res, next) => {
//   fn(req, res, next).catch(next)
// }

const getAllTours = catchAsync(async (req, res, next) => {
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
})

const getTour = catchAsync(async (req, res, next) => {
  // Behind The Scenes: Tour.findOne({ _id: req.params.id })
  const tour = await Tour.findById(req.params.id)

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  })
})

const createTour = catchAsync(async (req, res, next) => {
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
})

const updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!updatedTour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  })
})

const deleteTour = catchAsync(async (req, res, next) => {
  const deletedTour = await Tour.findByIdAndDelete(req.params.id)

  if (!deletedTour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(204).json({ status: 'success', data: null })
})

const getTourStats = catchAsync(async (req, res, next) => {
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
})

const getMonthlyPlan = catchAsync(async (req, res, next) => {
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
})

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
