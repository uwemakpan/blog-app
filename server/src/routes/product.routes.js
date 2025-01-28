const express = require('express')
const productRoute = express.Router()

const createNewProduct = require('../controllers/product.controllers')
const { requireSignin } = require('../middlewares/requireSignin')

// route to create new product
productRoute.post('/create', requireSignin, createNewProduct)

module.exports = productRoute
