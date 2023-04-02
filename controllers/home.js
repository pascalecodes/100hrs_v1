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
      //const playlist = posts.map(post => `${post.title} by ${post.user.userName}`)
      const playlist = posts.map(post => [post._id, post.title, post.user.userName, post.media])
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
      console.log(playlist)
      // console.log(video_list)
      res.render("watch.ejs", {posts: posts, user: req.user, ext: req.ext, playlist: playlist});
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },
  // test getvideo player function
  getVideo: async (req, res) =>{
    try{
      const posts = await Post.find().sort({ createdAt: "desc" }).populate('user').lean();
      const video_list = await 
        Post.find().populate('user')
       
  
        const video_detail = []; // initialize empty playlist array

        video_list.forEach(video => {
          video_detail.push({
            title: video.title,
            user: video.user.userName,
            description: video.description,
            url: video.media,
            id: video._id
          }); // add video objects to playlist array
        });
      // const video_detail = (req, res, next) => {
      //   Post.findById(req.params.id, (err, video) => {
      //     if (err) return next(err);
      //     console.log(video_detail)
      //     res.render('watch.ejs', { video: video_detail });
      //   });
      // };
      console.log( video_detail)
      res.render('watch.ejs', {posts: posts, videos: video_list, detail: video_detail})
  
    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },

};
