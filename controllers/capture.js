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
  // POST /videos
  captureVideo: async(req, res)=>{
    try {
      // Save the video file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
      });
  
      // Create a new Video object to save to MongoDB
      const video = new Video({
        title: req.body.title,
        description: req.body.description,
        filename: req.file.filename,
        cloudinaryPublicId: result.public_id,
      });
  
      // Save the Video object to MongoDB
      await video.save();
  
      res.status(201).json(video);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }


  },
};

