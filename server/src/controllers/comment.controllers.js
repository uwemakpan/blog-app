const Comment = require('../models/comment.model')
const Product = require('../models/product.model')
const { getBlogById } = require('../services/blogServices')

// create a new comment
const addCommentToBlog = async (req, res) => {
  const { blogId } = req.params
  const { text } = req.body
  const { userId } = req.user // destructured from the payload assigned to req.user

  try {
    // query for blog which comment is to be added to id
    const blog = await getBlogById(blogId)

    // create a new comment
    const comment = await Comment.create({ text, createdBy: userId })

    if (!comment) {
      throw new Error('Comment creation failed 🛑')
    }

    // add comment to blog
    blog.comments.push(comment._id)

    // save update on blog to persist comment id on db
    await blog.save()

    return res
      .status(201)
      .json({ message: 'Comment added successfully ✅', data: comment })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

// add comments to a product name
const addCommentToProduct = async (req, res) => {
  const { _id } = req.params
  const { text } = req.body
  const { userId } = req.user // destructured from the payload assigned to req.user

  try {
    // query for blog which comment is to be added to id
    const product = await Product.findById(_id)

    // create a new comment
    const comment = await Comment.create({ text, createdBy: userId })

    if (!comment || !product) {
      throw new Error('Comment creation failed 🛑')
    }

    // add comment to blog
    product.comments.push(comment._id)

    // save update on blog to persist comment id on db
    await product.save()

    return res
      .status(201)
      .json({ message: 'Comment added successfully ✅', data: comment })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

module.exports = { addCommentToBlog, addCommentToProduct }
