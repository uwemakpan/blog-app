const express = require('express')
const {
  createNewUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUsers,
  uploadProfileImage,
} = require('../controllers/user.controllers')

const {
  userDataValidationRules,
  checkValidationError,
} = require('../middlewares/datavalidator')

// import the requireSignin middleware
const { requireSignin } = require('../middlewares/requireSignin')

// import multer
const upload = require('../middlewares/multer')

// specify that userRoutes is an express Router
const userRoutes = express.Router()

// add neew user
userRoutes.post(
  '/',
  userDataValidationRules,
  checkValidationError,
  createNewUser
)

// getting all users
userRoutes.get('/', getAllUsers)

// search users
userRoutes.get('/search', searchUsers)

// get logged in user
userRoutes.get('/logged-in-user', requireSignin, getCurrentUser)

// get single user by id
userRoutes.get('/:userId', getUserById)

// update user by id
userRoutes.put('/:userId', updateUserById)

// delete  a user
userRoutes.delete('/:userId', deleteUserById)

// route to upload image file
userRoutes.patch(
  '/profile-upload',
  requireSignin,
  upload.single('imageFile'),
  uploadProfileImage
)

module.exports = userRoutes
