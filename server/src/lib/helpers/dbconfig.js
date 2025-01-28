const mongoose = require('mongoose')
const { DB_URI } = require('../../lib/index')

const connectdb = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log('Connected to Database ✅')
  } catch (error) {
    console.log('database connection failed ❌')
  }
}

module.exports = connectdb
