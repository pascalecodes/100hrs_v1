const cloudinary = require("../middleware/cloudinary");
require('dotenv').config();
const Find = require("../models/Post");
const path = require('path')


module.exports = {
  getFind: async (req, res) => {
    try {
      res.render("find.ejs");
    } catch(err) {
      console.log(err)
      res.render('error/404')
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

