const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose
const { Subscription } = require('../../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSSINES],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user', // ссылка на модель user
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)
// зашифровываем пароль перед записью в БД
userSchema.pre('save', async function (next) {
  // хэшировать только если изменяли пароль
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})
// сравниваем пароль, тот же или нет
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
