const Book = require('../models/book.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')

module.exports = {
  addDoc(req, res) {
    console.log('req.body :', req.body);
    const { content, userId, bookId } = req.body
    Review.create(req.body)
      .then((result) => {
        User.findByIdAndUpdate(userId,
          {
            $push: {
              reviews: result._id
            }
          }
        )
          .exec()
          .then(user => {
            Book.findByIdAndUpdate(bookId,
              {
                $push: {
                  reviews: result._id
                }
              }
            )
              .exec()
              .then(book => {
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
  },
  showDoc(req, res) {
    Book.find()
      .populate('userId')
      .populate('bookId')
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
    Review.findById(req.params.id)
      .populate('userId')
      .populate('bookId')
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
    Review.findByIdAndRemove(req.params.id)
      .exec()
      .then((result) => {
        User.findByIdAndUpdate(result.userId, {
          $pull: {
            reviews: result._id
          }
        })
          .then(user => {
            Book.findByIdAndUpdate(result.bookId, {
              $pull: {
                reviews: result._id
              }
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