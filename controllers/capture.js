require('dotenv').config();
const cloudinary = require("../middleware/cloudinary");
const Capture = require("../models/Post");


module.exports = {
  getCapture: (req, res) => {
    res.render("capture.ejs");
  },
  getUpload: (req, res) => {
    res.render("upload.ejs");
  },
  uploadFile: async (req, res) => {
    try {
      // Upload video to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", folder: "memwa",
      });
      await Capture.create({
        title: req.body.title,
        user: req.user.id,
        media: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        description: req.body.description,
        status: req.body.status,
        likes: 0,
      });
      console.log("Capture has been uploaded!");
      res.redirect("/capture");
    } catch (err) {
      console.log(err);
    }
  },
};

