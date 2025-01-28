const Product = require('../models/product.model')

// create new product
const createNewProduct = async (req, res) => {
  const { productName, price, productDesc } = req.body
  const { userId } = req.user

  try {
    const newProduct = await Product.create({
      productName,
      price,
      productDesc,
      createdBy: userId,
    })

    if (!newProduct) {
      return res.status(403).json({ message: 'Error creating product 🛑' })
    }

    return res
      .status(201)
      .json({ message: 'Product created successfully ✅', newProduct })
  } catch (error) {
    res.status(403).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

module.exports = createNewProduct
