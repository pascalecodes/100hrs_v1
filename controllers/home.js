const Post = require("../models/Post");
const User = require("../models/User");
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
      const ext= posts.map(post=> path.extname(post.media))
      //const playlist = posts.forEach(post => {title: post.title, media: post.media, user: post.userName})

      // const video_list = function(req, res) {
      //   Post.find()
      //     .exec(function(err, playlist) {
      //       if (err) { return next(err); }
      //       res.render('watch.ejs', { title: 'Video Playlist', playlist: playlist });
      //     });
      // };
      
      // const video_detail = function(req, res) {
      //   Post.findById(req.params.id)
      //     .exec(function(err, video) {
      //       if (err) { return next(err); }
      //       res.render('post.ejs', { posts: posts, user: req.user});
      //     });
      // };

      //res.render("feed.ejs", { posts: posts });
      console.log(posts)
      console.log(ext)
      // console.log(video_list)
      res.render("watch.ejs", {posts: posts, user: req.user, ext: req.ext});
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },

};
