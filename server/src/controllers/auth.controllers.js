const {
  getUserByEmail,
  checkIfUserExistsById,
} = require('../services/userServices')
const { verifyPassword } = require('../lib/helpers/passwordHelpers')
const { generateToken, verifyToken } = require('../lib/helpers/jwtHelpers')
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require('../lib/index')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const userExists = await getUserByEmail(email)

    if (userExists) {
      // check if user's password is correct
      const passwordIsValid = await verifyPassword(
        password,
        userExists?.password
      )

      if (!passwordIsValid) {
        return res.status(401).json({ error: 'Invalid login credentials' })
      }

      // gnerate authorization token for thie user
      const payload = {
        userId: userExists.id,
        email: userExists.email,
      }

      // generate access token
      const accessToken = generateToken(
        payload,
        JWT_SECRET,
        ACCESS_TOKEN_EXPIRES_IN
      )

      // Generate new access Token  using the refresh token
      const refreshToken = generateToken(
        payload,
        JWT_SECRET,
        REFRESH_TOKEN_EXPIRES_IN
      )

      // configure your cookie storage
      const cookieOptions = {
        expires: new Date(Date.now() + 3600),
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }

      // generate new refresh token
      return res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .json({
          message: 'Logged in successfully ✔️',
          data: { refreshToken },
        })
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error 🛑' })
  }
}

const getNewAccessToken = async (req, res) => {
  try {
    // obtain refresh token from the request header
    const refreshToken = req.headers['authorization']

    // return error if no refresh token
    if (!refreshToken) {
      return res.status(403).json({ error: 'Invalid Token 🛑' })
    }

    if (refreshToken.split(' ')[0] !== 'Bearer') {
      return res.status(403).json({ error: 'Invalid Token 🛑' })
    }

    const payload = verifyToken(refreshToken.split(' ')[1], JWT_SECRET)

    if (!payload) {
      return res.status(403).json({ error: 'Invalid Token 🛑' })
    }

    // check if user exists
    const userExists = await checkIfUserExistsById(payload.userId)

    // return error if user does not exist
    if (!userExists) {
      return res.status(403).json({ error: 'Invalid Token 🛑' })
    }

    // generate a new accessTokenPayload
    const accessTokenPayload = {
      userId: userExists?.id,
      email: userExists?.email,
    }

    const accessToken = generateToken(accessTokenPayload, JWT_SECRET, '1h')

    const cookieOptions = {
      expires: new Date(Date.now() + 3600),
      maxAge: 60 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }

    return res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .json({ message: 'Token generated successfully ✅' })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error ❌' })
  }
}

const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie('accessToken')
      .json({ message: 'Logged out successfully 👋' })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error ❌' })
  }
}

module.exports = { loginUser, getNewAccessToken, logoutUser }
