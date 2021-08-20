const mongoose = require('mongoose');
const fs = require('fs');
const googleDriver = require('../../google/google-drive-api');

const Post = require('../models/post');

const getPosts = async (req, res) => {
   try {
      // const { userId } = req.body;
      // const posts = Post.find({ _id: userId });
      // res.status(200).json({ posts });
      //await googleDriver.generatePublicUrl();
      res.status(200).json({ status: 'SUCCES UPLOAD' });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
};

const creatNewPost = async (req, res) => {
   try {
      const { file } = req;
      const uploadImageData = await googleDriver.uploadFile(file);
      fs.unlinkSync(file.path);
      console.log(uploadImageData.data);

      res.status(200).json({ status: 'SUCCES UPLOAD' });

      // const { user, content, image } = req.body;
      // const post = new Post({
      //    _id: mongoose.Types.ObjectId(),
      //    create_date: Date.now(),
      //    user: user._id,
      //    content,
      //    image,
      // });
      // await post.save();
      // res.status(201).json({
      //    post,
      // });
   } catch (error) {
      res.status(400).json({
         message: error,
      });
   }
};

module.exports = { getPosts, creatNewPost };
