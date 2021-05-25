const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema, model } = mongoose
const { Subscription } = require('../../helpers/constants')

const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return re.test(String(value).toLowerCase())
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User
