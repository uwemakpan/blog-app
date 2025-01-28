// Middleware to ensure that the access token is still valid
// or has not expired yet

const { verifyToken } = require('../lib/helpers/jwtHelpers')
const { JWT_SECRET } = require('../lib/index')

const requireSignin = (req, res, next) => {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res
        .status(403)
        .json({ error: 'Access Denied. u are not logged in 🛑' })
    }

    const payload = verifyToken(accessToken, JWT_SECRET)

    req.user = payload

    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = { requireSignin }
