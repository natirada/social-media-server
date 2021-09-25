const mongoose = require('mongoose');
const fs = require('fs');
const googleDriver = require('../../google/google-drive-api');

const Post = require('../models/post');

const getPosts = async (req, res) => {
   try {
      const {_id } = req.body.user;
      const posts = await Post.find({user: _id}).sort('-create_date');

      return res.status(200).json({ posts });
   } catch (error) {
    return res.status(400).json({
         error,
      });
   }
};

const creatNewPost = async (req, res) => {
   try {
      console.log('creatNewPost');
      const { file } = req;
      const { content, userId } = req.body;
      let imageId = '';
      if (file) {
         const uploadImageData = await googleDriver.uploadFile(file);
         fs.unlinkSync(file.path);
         console.log(uploadImageData.data);
         imageId = uploadImageData.data.id;
      }

      const post = new Post({
         _id: mongoose.Types.ObjectId(),
         create_date: Date.now(),
         user: userId,
         content,
         image: imageId,
         image_public_url: `https://drive.google.com/uc?export=view&id=${imageId}`
      });
      await post.save();
      res.status(201).json({
         post,
      });
   } catch (error) {
      res.status(400).json({
         message: error,
      });
   }
};

module.exports = { getPosts, creatNewPost };
