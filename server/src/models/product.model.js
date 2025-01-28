const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  productDesc: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
