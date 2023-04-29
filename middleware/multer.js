const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  // fileFilter: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
  //   cb(null, true);
  // },
  // limits: {
  //   fileSize: 100 * 1024 * 1024, // 100MB
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
    // if (file.size > 100 * 1024 * 1024) {
    //   cb(new Error("File is too large"), false);
    //   return;
    // }
    cb(null, true);
  },
});
