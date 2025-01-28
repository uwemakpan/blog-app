const { hashPassword } = require('../lib/helpers/passwordHelpers')
const User = require('../models/user.model')

// create new user function
const newUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password)

  const newUserData = { ...userData, password: hashedPassword }
  const newUser = await User.create(newUserData)

  if (!newUser) {
    throw new Error('User creation failed')
  }

  return newUser
}

// get User by email => check if user email already exists
const checkIfUserWithEmailExists = async (email) => {
  const user = await User.findOne({ email })

  if (user) {
    throw new Error('User with email already exists!!')
  }
}

// get User by email => check if user email does not exist
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User with email does not exist 😔')
  }

  return user
}

/***
 * @method checkIfUserExistsById
 * @param {String} userId
 * @returns {Promise}
 */
const checkIfUserExistsById = async (userId) => {
  const user = await User.findById(userId).select('-password').select('-__v')

  if (!user) {
    throw new Error('User with id does not exist ❌')
  }

  return user
}

module.exports = {
  newUser,
  checkIfUserWithEmailExists,
  getUserByEmail,
  checkIfUserExistsById,
}
