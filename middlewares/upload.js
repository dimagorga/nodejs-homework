const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../", "tmp");

const uploadConfig = multer.diskStorage({
  distination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: uploadConfig,
});

module.exports = { upload };
