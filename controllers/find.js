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
      //const query = req.query.q
      //const findTitle =  await Post.find({$or: [{title: query}]}).populate('title')
      //db.collection('posts').find({$or: [{title: query}, {tags: query}]}).toArray(function(err, results) {

        //res.render('search.ejs', {results: results});
      //const findDescription = req.query.description.split(',')
      //const findCaption = req.query.caption
      res.render('find.ejs', {results: [] })
      //const items: await ItemList.find()
      //res.render("find.ejs"/*,{itemList:items}*/)
      console.log(`get results: ${results}`)

    } catch(err) {
      console.log(err)
      res.render('error/404')
    }
  },
  postFind: async (req, res) => {
    const query = req.body.query
    try {
      const results =  await Post.find({
        $or: [
          {title: {$regex: guery, $options: 'i'}},
          {body: {$regex: query, $options: 'i'}}
        ]
      })
      res.render('find.ejs', {results})
      console.log(`post results: ${results}`)

    } catch(err) {
      //console.log(err)
      console.error(err)
      //res.render('error/404')
      res.render('find.ejs', {results: []})
    }
  },
  findPost: async (req, res) => {
    try {
      const searchTerm= req.query.searchTerm;
      let posts;
      if(searchTerm){
        //search for term in title
        //posts = await Post.find({title: {$regex: searchTerm, $options: 'i'}});

        //search for term in title, caption or description
        posts = await Post.find({$or: [{title: {$regex: searchTerm, $options: 'i'}}, {caption: {$regex: searchTerm, $options: 'i'}}, {description: {$regex: searchTerm, $options: 'i'}}]});
        console.log(posts)
      }else {
        posts = await Post.find()
      }
      
      res.render("find.ejs", { posts: posts, searchTerm: searchTerm});
    
      console.log(`this is it: ${searchTerm}`)
  
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
  },
};


