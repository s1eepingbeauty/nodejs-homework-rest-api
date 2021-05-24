const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }

    const newUser = await Users.create(req.body)
    const { email, subscription } = newUser
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(user.id, token)

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {}

module.exports = {
  signup,
  login,
  logout,
}
