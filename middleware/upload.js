const multer = require('multer')
const path = require('path')

const MIME_TYPE = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(MIME_TYPE[file.mimetype])
    console.log(cb)
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1024,
  },
})

const fileFilter = (req, file, cb) => {
  MIME_TYPE[file.mimetype] ? cb(null, true) : cb(null, false)
}

const upload = multer({
  storage: multerConfig,
  fileFilter,
})

module.exports = upload
