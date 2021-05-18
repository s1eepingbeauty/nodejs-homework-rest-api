const Users = require('../model/users')
const jwt = require('jsonwebtoken')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (res, req, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is allready used',
      })
    }
    const newUser = await Users.create(req.body)
    const { id, email, subscribtion } = newUser
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id,
        email,
        subscribtion,
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (res, req, next) => {}

const logout = async (res, req, next) => {}

module.exports = {
  signup,
  login,
  logout,
}
