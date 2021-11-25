const { Unauthorized } = require('http-error')

const Jimp = require('jimp')

const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const userDir = path.join(__dirname, '../../', 'public/avatars')

const updateImg = async (req, res, next) => {
  if (!req.file) {
    return next(new Unauthorized())
  }
  const { path: tempName, originalname } = req.file
  try {
    const { id } = req.user
    const uploadPath = path.join(userDir, id, originalname)
    await fs.rename(tempName, uploadPath)
    const avatar = `/public/avatars/${id}/${originalname}`

    const file = await Jimp.read(uploadPath)
    file.resize(250, 250).write(uploadPath)

    await User.findByIdAndUpdate(id, { avatarURL: avatar })

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: avatar,
      },
    })
  } catch (error) {
    await fs.unlink(tempName)
  }
}
module.exports = updateImg
