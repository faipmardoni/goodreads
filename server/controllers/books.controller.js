const Book = require('../models/book.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')

module.exports = {
  addDoc(req, res) {
    const image = req.imageURL
    const { judul, penerbit, penulis, userId } = req.body
    Book.create({ judul, penerbit, penulis, userId, image })
      .then((result) => {
        User.findByIdAndUpdate(userId, 
          {
            $push: {
              books: result._id
            }
          }
        )
          .exec()
          .then(user => {
            res.status(200).json({
              message: 'success',
              result
            })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  showDoc(req, res) {
    Book.find()
      .populate('userId')
      .populate('reviews')
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  detailDoc(req, res) {
    Book.findById(req.params.id)
    .populate('userId')
    .populate('reviews')
    .exec()
      .then((result) => {
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  deleteDoc(req, res) {
    Book.findByIdAndRemove(req.params.id)
      .exec()
      .then((result) => {
        User.findByIdAndUpdate(result.userId, {
          $pull: {
            books: result._id
          }
        })
          .then(user => {
            Review.deleteMany({
              bookId: req.params.id
            })
              .exec()
              .then(answer => {
                res.status(200).json({
                  message: 'success',
                  result
                })
              })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  }
}