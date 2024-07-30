// This is a class definition for APIFeatures that provides methods for filtering, sorting, limiting fields, and pagination.

class APIFeatures {
  // The constructor initializes the class with a query and a queryString
  constructor(query, queryString) {
    this.query = query // The query object (typically a Mongoose query)
    this.queryString = queryString // The query string from the request (typically req.query)
  }

  // Method to filter the query based on the queryString
  filter() {
    const queryObj = { ...this.queryString } // Create a shallow copy of the queryString object
    const excludedFields = ['page', 'sort', 'limit', 'fields'] // Fields to exclude from filtering
    excludedFields.forEach((field) => delete queryObj[field]) // Remove excluded fields from the query object

    // Convert query object to a JSON string and replace operators with MongoDB operators
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`, // Replace gte, gt, lte, lt with $gte, $gt, $lte, $lt
    )

    this.query = this.query.find(JSON.parse(queryStr)) // Apply the filter to the query

    return this // Return the instance to allow method chaining
  }

  // Method to sort the query based on the sort parameter in the queryString
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ') // Convert comma-separated sort fields to space-separated
      this.query = this.query.sort(sortBy) // Apply sorting to the query
    } else {
      this.query = this.query.sort('-createdAt') // Default sort by createdAt in descending order
    }

    return this // Return the instance to allow method chaining
  }

  // Method to limit the fields returned in the query
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ') // Convert comma-separated fields to space-separated
      this.query = this.query.select(fields) // Select only the specified fields
    } else {
      this.query = this.query.select('-__v') // Default to excluding the __v field
    }

    return this // Return the instance to allow method chaining
  }

  // Method to paginate the query results
  paginate() {
    const page = Number(this.queryString.page) || 1 // Default to page 1 if not specified
    const limit = Number(this.queryString.limit) || 100 // Default to limit of 100 if not specified
    const skip = (page - 1) * limit // Calculate the number of documents to skip
    this.query = this.query.skip(skip).limit(limit) // Apply pagination to the query

    return this // Return the instance to allow method chaining
  }
}

// Export the APIFeatures class to be used in other parts of the application
module.exports = APIFeatures
