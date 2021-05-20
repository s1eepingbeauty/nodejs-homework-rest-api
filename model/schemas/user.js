const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema, SchemaTypes, model } = mongoose
const { Subscription } = require('../../helpers/constants')
const SALT_FACTOR = 6 // количество итераций для солей

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
      enum: [
        Subscription.STARTER,
        Subscription.PRO,
        Subscription.BUSSINES,
        'It not allowed',
      ],
      default: Subscription.STARTER,
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
// зашифровываем пароль перед(pre) записью в БД
userSchema.pre('save', async function (next) {
  // хэшировать только если изменяли пароль
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    // шифруем(хэшируем) пароль
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})
// сравниваем пароль, тот же или нет
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User
