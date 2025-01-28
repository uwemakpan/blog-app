const bycrypt = require('bcryptjs')

// function to encrypt password
const hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10)

  const hashedPassword = await bycrypt.hashSync(password, salt)

  return hashedPassword
}

// password to verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bycrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }
