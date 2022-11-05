const Post = require("../models/Post");
const path = require('path')

module.exports = {
  getIndex: async (req, res) => {
    try {
      // if(ensureAuth){
      //   res.render("feed.ejs");
      // }
      res.render("index");
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },
  getHome: async (req, res) => {
    try {
      // if(ensureAuth){
      //   res.render("feed.ejs");
      // }
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      const ext= posts.map(post=> path.extname(post.media))
      console.log(ext)
      //res.render("feed.ejs", { posts: posts });
      res.render("home.ejs", {posts: posts, user: req.user, ext: ext});
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },
  getWatch: async (req, res) => {
    try {
      // if(ensureAuth){
      //   res.render("feed.ejs");
      // }
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      //res.render("feed.ejs", { posts: posts });
      res.render("watch.ejs", {posts: posts, user: req.user});
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },

};
