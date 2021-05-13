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
    timestamps: true, // добавляем время создания и время обновления контакта
    toObject: { virtuals: true }, // включаем виртуальные поля
    toJSON: {
      virtuals: true,
      // удаляем не нужные поля в JSON
      transform: function (_doc, ret) {
        // doc - The Mongoose document which is being converted,
        // ret - The plain object representation which has been converted
        delete ret._id
        delete ret.fullName
        return ret
      },
    },
  },
)
contactShema.virtual('fullName').get(function () {
  return `This is ${this.name} - ${this.phone}`
})

contactShema.path('name').validate(value => {
  // валидируем поля, не валидные данные не запишутся в базу
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

const Contact = mongoose.model('contact', contactShema)

module.exports = Contact
