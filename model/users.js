const User = require('./schemas/user')

const findById = async id => {
  return await User.findOne({ _id: id })
}

const findByEmail = async email => {
  return await User.findOne({ email })
}

const getUserByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken })
}

const create = async options => {
  const user = new User(options)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateSubscription = async (userId, body) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { ...body },
    { new: true },
  )
}

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL })
}

// устанавливаем isVerified равным true, а поле verificationToken в null
const updateVerificationToken = async (id, isVerified, verificationToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verificationToken })
}

module.exports = {
  findById,
  findByEmail,
  getUserByVerificationToken,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateVerificationToken,
}
