// import the Blog model
const Blog = require('../models/blog.model')

const getBlogById = async (id) => {
  // check if blog with id exists on the db
  const blogByIdExists = await Blog.findById(id)

  if (!blogByIdExists) {
    throw new Error('Blog not found 🛑')
  }

  // return blog if it exists
  return blogByIdExists
}

module.exports = { getBlogById }
