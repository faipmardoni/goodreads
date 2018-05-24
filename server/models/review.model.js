const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema({
  content: { type: String, required: true },
  userId: {
    type: schema.Types.ObjectId, ref: 'User',
  },
  bookId: {
    type: schema.Types.ObjectId, ref: 'Book',
  }
},  {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review