const multer = require('koa-multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: `public/images/`,
  filename(ctx, file, cb) {
    const filename = file.originalname.split('.');
    cb(null, Date.now() + '.' + filename[1])
  }
})
const upload = multer({ storage })
module.exports = upload