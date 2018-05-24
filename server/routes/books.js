const express = require('express')
const router = express.Router()

const multer = require('multer')
const middlewareUpload = require('../middlewares/upload')

const {
  authentication,
  authorization
} = require('../middlewares/auth')
const {
  addDoc,
  showDoc,
  detailDoc,
  deleteDoc
} = require('../controllers/books.controller')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

/* GET users listing. */
router.get('/', showDoc)
router.post('/', authentication, uploaderMem.single('image'), middlewareUpload.upload, addDoc)
router.get('/:id', authentication, detailDoc)
router.delete('/:id', authentication, deleteDoc)

module.exports = router
