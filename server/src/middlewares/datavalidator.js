// import the required body and valiationResult module from the express-validator
const { body, validationResult, check } = require('express-validator')

// express validation rules for blog data
const blogDataValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 5, max: 50 })
      .withMessage('Title should be at least 5 and most 50 characters'),

    body('content')
      .notEmpty()
      .withMessage('Content is required')
      .isLength({ min: 10, max: 100 })
      .withMessage('Content should be at least 10 and at most 100 characters'),
  ]
}

// specify valiation rules for user data
// const validateUserData = () => {
//   return [
//     body('firstName').notEmpty().withMessage('First name is required'),
//     body('lastName').notEmpty().withMessage('Last name is required'),
//     body('email')
//       .notEmpty()
//       .withMessage('Email is required')
//       .isEmail()
//       .withMessage('Invalid email address'),
//     body('password')
//       .notEmpty()
//       .withMessage('password is required')
//       .isLength({ min: 8 })
//       .withMessage('Password should be at least 8 characters'),
//     check('confirmPassword').custom((value, { request }) => {
//       if (value !== request.body.password) {
//         throw new Error('Password does not match')
//       }

//       return true
//     }),
//   ]
// }

const userDataValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password does not match')
    }

    return true
  }),
]

// handle express validation error
const checkValidationError = (request, response, next) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(400).json({ error: errors.errors[0].msg })
  }

  next()
}

// Manual installation or configuration
// const blogDataValidator = (request, response, next) => {
//   const { title, content } = request.body

//   if (!title) {
//     return response.status(400).json({ error: 'Title is required 🤭' })
//   }

//   if (!content) {
//     return response.status(400).json({ error: 'Content is required 🙄' })
//   }

//   // must call this in any middleware
//   next()
// }

module.exports = {
  blogDataValidator,
  userDataValidationRules,
  checkValidationError,
}
