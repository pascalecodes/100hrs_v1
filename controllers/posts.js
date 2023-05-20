const cloudinary = require("../middleware/cloudinary");
require('dotenv').config();
const Post = require("../models/Post");
const User = require("../models/User")
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
  uploadAvatar: async (req, res) => {
    const {id} = req.params;
    const {userName, email, firstName, lastName, avatar} = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto"})
      console.log(result)
      const user = await User.findOne({ _id: id})
      user.avatar = result.secure_url;
      await user.save();
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.render('error/500')
    }
      
    // try {
    //   const user = req.user
    //   const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto"})
    //   console.log(result)

    //   user.avatar = result.public_id
    //   //user.save()
    //   console.log(user.avatar)
    //  res.render('editProfile.ejs', {user: user})
    // } catch(err){
    //   console.log(err)
    //   res.render('error/500')
    // }
    

  },
  updateProfile: async (req,res) => {
    // try {
    //   const user= req.user;

    //   user.firstName = req.body.firstName;
    //   user.lastName = req.body.lastName;
    //   user.email = req.body.email;
    //   user.bio = req.body.bio;
    //   user.save()
    //   red.redirect('profile')

    // } catch(err){
    //   console.log(err)
    //   res.render('error/500')
    // }

    //get current user from req
    //const user = await User.find({user:req.user.id})
    //const post = await Post.findById(req.params.id).populate('user')
    try {

    // let user = await User.findById(req.params.id).lean()
    //   console.log('logged user:', user)
    //   //check if user is logged in
    //   if (!user) {
    //     res.send("You must be logged in to edit your profile.")
    //     return;
    //   }

      // if(user != req.user.id){
      //   res.redirect('/feed')
      // } else {
        // const {
        //   firstName,
        //   lastName,
        //   email,
        //   bio,
        //   //avatar,
        // } = req.body
        console.log('current info:', req.body)
        const updateUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          bio: req.body.bio,
          //avatar: avatar,
        }
        console.log('fields in form:', updateUser)
        await User.findByIdAndUpdate(req.params.id, updateUser, {
          upsert: true,
          merge: true,
        })
      //   user = await User.findOneAndUpdate({_id: req.params.id }, updateUser, {
      //     new: true,
      //     runValidators: true,
      // })
        // User.updateOne({ _id: req.user._id }, updateUser, (err, updateUser) => {
        //   if (err) {
        //     // Return an error message.
        //     res.render('editProfile.ejs', {
        //       errors: err,
        //       user: req.user,
        //     });
        //     return;
        //   }

        res.redirect('/profile')
        // })
  
    
      // }
      //get the form data from the request
//       const {
//         firstName,
//         lastName,
//         email,
//         bio,
//         avatar,
//       } = req.body
// console.log(req.body)
//check if first name is empty
// if (firstName === '') {
//   res.send('First name cannot be empty.');
//   return;
// }

// if (!firstName) {
//   res.send("First name is required.");
//   return;
// }

// if (!email) {
//   res.send("Email is required.");
//   return;
// }
//       //update the user's profile info
//       user.firstName = firstName ;
//       user.lastName = lastName;
//       user.email = email;
//       user.bio = bio;
//       if(avatar) {
//         user.avatar = cloudinaryClient.upload.upload(avatar, {public_id: user.username,})
//       }
// console.log(user.avatar)
//       //save the user's profile information
//       await user.save((err, user) =>  {
//         if(err){
//           res.send(err)
//           return
//         }
//         res.send('Your profile has been updated')
//       })
    } catch (err) {
      console.error(err)
      return req.render('error/500')
    }
  },
  editProfile: async (req,res) => {
    try {
      //get current user from req
      //const userprofile = await User.find({user: req.user.id})
      
      //const user = req.user;
      //const user = await User.findOne({ _id: req.params.id,}).lean()
      //console.log(user)
  
      // res.render('editProfile.ejs', {
      //   user,
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   email: req.body.email,
      //   bio: req.body.bio,
      // })

      const user = req.user;
      res.render('editProfile.ejs', {
        user,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        bio: req.body.bio,
        avatar: req.body.avatar,
      });

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
  // findPost: async (req, res) => {
  //   try {
  //     // const {postName} =req.query
  //     // const posts = await Post.find({title: postName})
  //     const postID = req.query
  //     console.log(postID)
  //     const posts = await Post.findById(postID)
  //     // const ext= posts.map(post=> path.extname(post.media))
      
  //     res.render("find.ejs", postID);
  //   } catch (err) {
  //     console.log(err);
  //     res.render('error/500')
  //   }
  // },
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
