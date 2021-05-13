const mongoose = require('mongoose')
const { Schema } = mongoose

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false, // отключаем версионность
  },
)

contactShema.path('name').validate(value => {
  // валидируем поля, не валидные данные не запишутся в базу
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

const Contact = mongoose.model('contact', contactShema)

module.exports = Contact
