const User = require('../models/user.model')
const { hashPassword } = require('../lib/helpers/passwordHelpers')
const { getUserByEmail } = require('../services/userServices')

const {
  newUser,
  checkIfUserWithEmailExists,
  checkIfUserExistsById,
} = require('../services/userServices')

// create new user
const createNewUser = async (request, response) => {
  const { firstName, lastName, email, password } = request.body

  try {
    // first check if user with email provided already exists
    await checkIfUserWithEmailExists(email)

    const user = await newUser({
      firstName,
      lastName,
      email,
      password,
    })

    if (!user) {
      return response.status(400).json({ error: 'User creation failed ❌' })
    }

    return response
      .status(201)
      .json({ message: 'User created successfully 👍', user })
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'Internal Server Error 🛑' })
  }
}

// get all blogs
const getAllUsers = async (request, response) => {
  try {
    const users = await User.find()

    // send error message if no user is found
    if (!users || users.length <= 0) {
      return response.status(404).json({ error: 'No User found 🛑' })
    }

    return response
      .status(200)
      .json({ message: 'Users found sucessfully', users })
  } catch (error) {
    response.status(500).json({ error: 'Internal Server error ❌' })
  }
} // end function getAllUsers

// get user by id
const getUserById = async (request, response) => {
  const { userId } = request.params

  try {
    const user = await User.findById(userId)

    // send error message if blog not found
    if (!user) {
      return response.status(404).json({ error: 'User not found🙄' })
    }

    // send success response to user with ID exists
    return response
      .status(200)
      .json({ message: 'User found successfully 👍', user })
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error 🛑' })
  }
}

// update existing user
const updateUserById = async (req, res) => {
  const { userId } = req.params

  try {
    const result = await User.findByIdAndUpdate(
      userId, // filter: find the user by email
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }, // update: change the user's name
      { new: true } // options:return the updated document
    )
    if (!result) {
      return res.status(400).json({ error: 'User  not updated successfully.' })
    }

    return res.status(201).json({ message: 'updated successfully 💪', result })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteUserById = async (request, response) => {
  const { userId } = request.params

  try {
    const result = await User.findByIdAndDelete(userId)

    // Gurad condition
    if (!result) {
      return response
        .status(400)
        .json({ error: 'User  not deleted successfully.' })
    }

    // if delete is successful
    return response
      .status(200)
      .json({ message: 'deleted successfully 💪', result })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const searchUsers = async (request, response) => {
  console.log(request.query)
  try {
    const queryResults = await User.find({
      $or: [
        { firstName: { $regex: request.query.searchQuery } },
        { lastName: { $regex: request.query.searchQuery } },
        { email: { $regex: request.query.searchQuery } },
      ],
    })

    if (!queryResults) {
      response.status(404).json({ error: 'No match was found 😔' })
    }

    return response
      .status(200)
      .json({ message: 'Some matches were found ✅', queryResults })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// get current logged in user
const getCurrentUser = async (req, res) => {
  const { userId } = req.user
  try {
    // get current user from DB
    const currentUser = await checkIfUserExistsById(userId)

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found 🛑' })
    }

    return res.status(200).json({ message: 'User found 💪', currentUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message || 'Internal Server Error ❌' })
  }
}

// controller to uploadProfileImage
const uploadProfileImage = async (req, res) => {
  const { userId } = req.user

  try {
    const currentUser = await checkIfUserExistsById(userId)

    currentUser.profileImage = `images/${req.file.filename}`

    await currentUser.save()

    return res
      .status(201)
      .json({ message: 'Profile image uploaded successfully ✅', currentUser })
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error 🛑' })
  }
}

module.exports = {
  createNewUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUsers,
  uploadProfileImage,
}

// User.findOneAndUpdate(
//   { email: 'user@example.com' }, // filter: find the user by email
//   { name: 'New Name' }, // update: change the user's name
//   { new: true } // options: return the updated document
// )
