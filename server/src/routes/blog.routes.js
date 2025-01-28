const express = require('express')

const {
  createNewBlog,
  getAllBlogs,
  getBlogsById,
  updateBlogById,
} = require('../controllers/blog.controllers')

const {
  blogDataValidator,
  checkValidationError,
} = require('../middlewares/datavalidator')
const { sanitizeData } = require('../middlewares/dataSanitzer')

// import the requireSigin middleware
const { requireSignin } = require('../middlewares/requireSignin')

const blogRoutes = express.Router()

// create a new blog
blogRoutes.post(
  '/',
  requireSignin,
  blogDataValidator(),
  checkValidationError,
  sanitizeData,
  createNewBlog
)

// get all blogs on db
blogRoutes.get('/', getAllBlogs)

// get single blog by id
// blogRoutes.get('/:blogId', getBlogsById)

// get single blog by title
blogRoutes.get('/:blogTitle', getBlogsById)

// update single blog by id
blogRoutes.put('/:blogId', requireSignin, updateBlogById)

module.exports = blogRoutes
