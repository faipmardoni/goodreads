const express = require('express')
const router = express.Router()
const {
  authentication,
  authorization
} = require('../middlewares/auth')
const {
  showUsers,
  addUsers,
  deleteUser,
  updateUser,
  detailUser,
  login
} = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', showUsers)
router.post('/', addUsers)
router.post('/login', login)
router.get('/:id', authentication, detailUser)
router.delete('/:id', authentication, authorization, deleteUser)
router.put('/:id', authentication, authorization, updateUser)

module.exports = router
