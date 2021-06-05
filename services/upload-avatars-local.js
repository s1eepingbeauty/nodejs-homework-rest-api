const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const createFolderIsNotExist = require('../helpers/create-dir')

class Upload {
  constructor(AVATARS_OF_USERS) {
    this.AVATARS_OF_USERS = AVATARS_OF_USERS
  }

  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile)
    file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE, // |- побитовое ИЛИ
      )
      .writeAsync(pathFile)
  }

  async saveAvatarToStatic({ idUser, pathFile, nameFile, oldFile }) {
    await this.transformAvatar(pathFile) // трансформируем файл аватарки
    const folderUserAvatar = path.join(this.AVATARS_OF_USERS, idUser) // подготавливаем папку для файла
    await createFolderIsNotExist(folderUserAvatar) // если папки нет - создаем ее
    await fs.rename(pathFile, path.join(folderUserAvatar, nameFile)) // переносим файл из папки upload в images
    // удаляем, если в images был старый аватар
    await this.deleteOldAvatar(
      path.join(process.cwd(), this.AVATARS_OF_USERS, oldFile),
    )
    const avatarURL = path.normalize(path.join(idUser, nameFile))

    return avatarURL
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = Upload
