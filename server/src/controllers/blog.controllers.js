const Blog = require('../models/blog.model')
const getPagination = require('../lib/helpers/pagination')

// create new blog
const createNewBlog = async (request, response) => {
  const { title, content } = request.body
  const { userId } = request.user

  try {
    const blog = new Blog({ title, content, createdBy: userId })

    // save created blog to db
    await blog.save()

    // send error response to client if blog creation failed
    if (!blog) {
      return response.status(400).json({ error: 'Blog creation failed ❌' })
    }

    // send success resonse to client on blog creation success
    return response
      .status(201)
      .json({ message: 'Blog created successfully', blog })
  } catch (error) {
    response.status(500).json({ message: 'Internal Server error 🛑' })
  }
}

// get all blogs
const getAllBlogs = async (request, response) => {
  const { page, limit } = request.query
  try {
    const { offset, limit: pageLimit } = getPagination(page, limit)
    const blogs = await Blog.find()
      .skip(offset)
      .limit(pageLimit)
      .populate('createdBy', 'firstName lastName email _id')
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'firstName lastName email _id' },
      })

    // send error message if no blog found
    if (!blogs || blogs.length <= 0) {
      return response.status(404).json({ error: 'No Blog found 🛑' })
    }

    return response
      .status(200)
      .json({ message: 'Blog found sucessfully', blogs })
  } catch (error) {
    response.status(500).json({ error: 'Internal Server error ❌' })
  }
}

// get blog by id
const getBlogsById = async (request, response) => {
  const { blogTitle } = request.params

  try {
    const blog = await Blog.findOne({ title: blogTitle })
      .populate('createdBy', 'firstName lastName email _id')
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'firstName lastName email _id' },
      })

    // send error message if blog not found
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found🙄' })
    }

    // send success response to client of blog with ID exists
    return response
      .status(200)
      .json({ message: 'Blog found successfully 👍', blog })
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error 🛑' })
  }
}

// update blog by id

const updateBlogById = async (req, res) => {
  const { userId } = req.user
  const { blogId } = req.params

  try {
    const result = await Blog.findByIdAndUpdate(
      { _id: blogId }, // filter: find the user by email
      { content: req.body.content, title: req.body.title, createdBy: userId }, // update: change the user's name
      { new: true } // options:return the updated document
    )
    if (!result) {
      return res.status(400).json({ error: 'Blog  not updated successfully.' })
    }

    return res.status(201).json({ message: 'updated successfully 💪', result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { createNewBlog, getAllBlogs, getBlogsById, updateBlogById }
