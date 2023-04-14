const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const captureController = require("../controllers/capture");
//const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: require('cloudinary').v2,
  params: {
    resource_type: 'video',
    public_id: (req, file) => req.body.title,
  },
});
const upload = multer({ dest: 'uploads/' });
//const upload = multer({ storage: storage });

router.get("/", ensureAuth, captureController.getCapture);
//router.get("/upload", ensureAuth, captureController.getUpload)
//router.post("/upload", ensureAuth, captureController.uploadFile)
router.post("/upload", upload.single("videoBlob"), captureController.uploadVideo)

module.exports = router;