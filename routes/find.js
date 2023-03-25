const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const captureController = require("../controllers/capture");
const findController = require("../controllers/find");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//router.get("/find", ensureAuth, findController.getFind)
router.get("/", findController.getFind)
// async (req, res) => {
//     const { resName } = req.query;
//     const restaurants = await Restaurant.find({ $text: { $search: { name: resName } } });
//     res.render('restaurants', { restaurants });
// })
router.post("/", findController.postFind)
//router.get("/find/:id", findController.findID);

module.exports = router;