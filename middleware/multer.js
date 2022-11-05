const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  // fileFilter: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
  //   cb(null, true);
  // },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".svg" &&
      ext !== ".webp" &&
      ext !== ".webm" &&
      ext !== ".mp4"
    ) {
      cb(new Error("File type is not Supported"), false);
      return;
    }
    cb(null, true);
  },
});
