const cloudinary = require("../middleware/cloudinary");
require('dotenv').config();
const Post= require("../models/Post");
const path = require('path')
//const ItemList = require('../models/itemsList')
//const connectDB = require("./config/database");
//const db = connectDB()


module.exports = {
  getFind: async (req, res) => {
    try {
      //const collection = db.collection('Test100hrsV1')
      const query = req.query.q
      const findTitle =  await Post.find({$or: [{title: query}]}).populate('title')
      //db.collection('posts').find({$or: [{title: query}, {tags: query}]}).toArray(function(err, results) {

        //res.render('search.ejs', {results: results});
      //const findDescription = req.query.description.split(',')
      //const findCaption = req.query.caption
      res.render('find.ejs', {results: findTitle, title: req.title})
      //const items: await ItemList.find()
      //res.render("find.ejs"/*,{itemList:items}*/)
      console.log(`this is it: ${query}`)

    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },
  findPost: async (req, res) => {
    try {
      const searchTerm= req.query.searchTerm;
      let posts;
      if(searchTerm){
        posts = await Post.find({title: {$regex: searchTerm, $options: 'i'}});
        console.log(posts)
      }else {
        posts = await Post.find()
      }
  
      // const {postName} =req.query
      // const posts = await Post.find({title: postName})

      //const postID = await Post.findById(req.params.id);
      //console.log(postID.value)

      //const posts = await Post.findById(postID.value)
      // const ext= posts.map(post=> path.extname(post.media))
      
      res.render("find.ejs", { posts: posts, searchTerm: searchTerm});
      console.log(`this is it: ${searchTerm}`)
  
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
  // searchData: {
  //   app.get('/restaurants/search', async (req, res) => {
  //     const { resName } = req.query;
  //     const restaurants = await Restaurant.find({ $text: { $search: { name: resName } } });
  //     res.render('restaurants', { restaurants });
  // })
  // }
};


