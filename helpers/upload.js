const multer = require('multer')
require('dotenv').config()

const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  // в какую папку положить
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  // как назвать файл
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})
// максимальный размер аватарки 2 Mb
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    // Функция должна вызывать `cb` с булевым значением,
    // которое показывает, следует ли принять файл

    // Если не картинка - отклонить файл
    if (!file.mimetype.includes('image')) {
      cb(null, false)
      return
    }
    // Принять файл
    cb(null, true)

    // Вы можете всегда вернуть ошибку, если что-то пошло не так:
    cb(new Error("I don't have a clue!"))
  },
})

module.exports = upload
