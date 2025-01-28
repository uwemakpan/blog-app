const express = require('express')
const {
  addCommentToBlog,
  addCommentToProduct,
} = require('../controllers/comment.controllers')
const { requireSignin } = require('../middlewares/requireSignin')
const commentRoutes = express.Router()

// route to add comment to blog after sigin
commentRoutes.post('/blog/:blogId', requireSignin, addCommentToBlog)

// route to add comment to product after sigin
commentRoutes.post('/comment/:_id', requireSignin, addCommentToProduct)

module.exports = commentRoutes
