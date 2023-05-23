const cloudinary = require("../middleware/cloudinary");
require('dotenv').config();
const Post= require("../models/Post");
const path = require('path')
//const ItemList = require('../models/itemsList')
//const connectDB = require("./config/database");
//const db = connectDB()


module.exports = {
  getSearch: (req, res) => {
    //const query= req.query.q
      //const collection = db.collection('Test100hrsV1')
      //const query = req.query.q
      //const findTitle =  await Post.find({$or: [{title: query}]}).populate('title')
      //db.collection('posts').find({$or: [{title: query}, {tags: query}]}).toArray(function(err, results) {

        //res.render('search.ejs', {results: results});
      //const findDescription = req.query.description.split(',')
      //const findCaption = req.query.caption
      res.render('search.ejs', {results: [] })
      //const items: await ItemList.find()
      //res.render("find.ejs"/*,{itemList:items}*/)
      //console.log(`get results: ${results}`)
  },
  postSearch: async (req, res) => {
    const query = req.body.q
    try {
      const results =  await Post.find({
        $or: [
          {title: {$regex: query, $options: 'i'}},
          {caption: {$regex: query, $options: 'i'}},
          {description: {$regex: query, $options: 'i'}}
        ]
      })
      //console.log(query)
      res.render('search.ejs', {results})
      console.log(`post results: ${results}`)

    } catch(err) {
      //console.log(err)
      console.error(err)
      //res.render('error/404')
      res.render('search.ejs', {results: []})
    }
  },
  //This is the function that is being used for the search and find functionality
  findPost: async (req, res) => {
    try {
      const searchTerm= req.query.searchTerm;
      let posts;
      if(searchTerm){
        //search for term in title
        //posts = await Post.find({title: {$regex: searchTerm, $options: 'i'}});

        //search for term in title, caption or description
        posts = await Post.find({$or: [{title: {$regex: searchTerm, $options: 'i'}}, {caption: {$regex: searchTerm, $options: 'i'}}, {description: {$regex: searchTerm, $options: 'i'}}]});
        //console.log(posts)
      }else {
        posts = await Post.find()
      }
      
      res.render("find.ejs", { posts: posts, searchTerm: searchTerm});
    
      //console.log(`this is it: ${searchTerm}`)
  
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
};


