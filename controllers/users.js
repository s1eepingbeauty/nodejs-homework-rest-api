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
    const { email, subscription, avatarURL } = newUser
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email,
        subscription,
        avatar: avatarURL,
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
          id: user.id,
          email: user.email,
          subscription: user.subscription,
          avatar: user.avatarURL,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, _next) => {
  const userId = req.user.id
  await Users.updateToken(userId, null)

  return res.status(HttpCode.NO_CONTENT).json({})
}

const patch = async (req, res, next) => {
  const userId = req.user.id
  const body = req.body

  try {
    const user = await Users.updateSubscription(userId, body)

    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          user: {
            id: user.id,
            email: user.email,
            subscription: user.subscription,
          },
        },
      })
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    })
  } catch (error) {
    next(error)
  }
}

const currentUser = async (req, res, next) => {
  const userId = req.user.id

  try {
    const user = await Users.findById(userId)

    if (!user && !user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          id: user.id,
          email: user.email,
          subscription: user.subscription,
          avatar: user.avatarURL,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  logout,
  patch,
  currentUser,
}
