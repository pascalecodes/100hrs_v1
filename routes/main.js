const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const captureController = require("../controllers/capture");
const findController = require("../controllers/find");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", ensureGuest, homeController.getIndex);
router.get("/home", ensureAuth, homeController.getHome);

router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/profile/edit", postsController.editProfile)
router.post("/uploadAvatar", upload.single("avatar"), postsController.uploadAvatar)
//router.post("updateProfile", upload.single("avatar"), postsController.updateProfile)

router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
//router.get("/watch", ensureAuth, homeController.getWatch)
router.get("/watch", ensureAuth, homeController.getVideo)
//router.get("/playlist", ensureAuth, homeController.getPlaylist)
router.post("/signup", authController.postSignup);
//router.get("/capture", ensureAuth, captureController.getCapture);
//router.get("/capture/upload", ensureAuth, captureController.getUpload)
//router.post("/capture/upload", ensureAuth, captureController.uploadFile)
// router.post("/capture/videos", upload.single("file"), captureController.uploadVideo)
//router.get("/find", ensureAuth, findController.getFind)
router.get("/find", ensureAuth, findController.findPost)
router.post("/find", ensureAuth, findController.findPost)
// router.get("/find/posts", postsController.findPost)
// async (req, res) => {
//     const { resName } = req.query;
//     const restaurants = await Restaurant.find({ $text: { $search: { name: resName } } });
//     res.render('restaurants', { restaurants });
// })
//router.post("/find", ensureAuth, findController.uploadFile)

module.exports = router;
