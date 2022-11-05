const mongoose = require("mongoose");
//const User = require('./User')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index:true,
  },
  media: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
    index: true,
  },
  status: {
    type: String,
    default: 'public',
    enum:['public', 'private'],
  },
  likes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
