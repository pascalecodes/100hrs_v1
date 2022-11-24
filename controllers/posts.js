const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const path = require('path')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const ext= posts.map(post=> path.extname(post.media))
      res.render("profile.ejs", { posts: posts, user: req.user, ext: ext });
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      const ext= posts.map(post=> path.extname(post.media))
      console.log(ext)
      res.render("feed.ejs", { posts: posts,  user: req.user, ext: ext});
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      // const comments = await Comment.find(post+req.params.id).sort({ createdAt: "desc" }).lean();
      //const users = await User.findById(req.params._id)
    //   const userName = await User.find({_id: req.params.userName})
    //  console.log(userName)
      const ext= path.extname(post.media)
    
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, ext: ext});
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  findPost: async (req, res) => {
    try {
      const {postName} =req.query
      const posts = await Post.find({title: postName})
      const ext= posts.map(post=> path.extname(post.media))
      console.log(posts)
      res.render("find.ejs", { posts});
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  getAdd: async (req, res) => {
    try {
      res.render("stories/add.ejs")
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }    
  },
  createPost: async (req, res) => {
    try {
      //Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   resource_type: "auto", folder: "memwa",
      // });
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto"});
      
      await Post.create({
        title: req.body.title,
        user: req.user.id,
        media: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        description: req.body.description,
        status: req.body.status,
        likes: 0,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
      // Delete comment from db
      await Comment.remove({ post: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
 
};
