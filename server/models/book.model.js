const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookSchema = new schema({
  judul: { type: String, required: true },
  penerbit: { type: String, required: true },
  penulis: { type: String, required: true },
  image: { type: String },
  userId: {
    type: schema.Types.ObjectId, ref: 'User',
  },
  reviews: [{
    type: schema.Types.ObjectId, ref: 'Review',
  }]
},  {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book