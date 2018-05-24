const express = require('express')
const router = express.Router()

const {
  authentication,
  authorization
} = require('../middlewares/auth')

const {
  addDoc,
  showDoc,
  detailDoc,
  deleteDoc
} = require('../controllers/reviews.controller')

/* GET users listing. */
router.get('/', showDoc)
router.post('/', authentication, addDoc)
router.get('/:id', authentication, detailDoc)
router.delete('/:id', authentication, deleteDoc)

module.exports = router
