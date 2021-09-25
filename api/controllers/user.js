const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw Error('Faild To Login');

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw Error('Faild To Login');

      const accessToken = jwt.sign(
         { _id: user._id, email },
         process.env.ACCESS_TOKEN_SECRET,
      );
      return res.json({ user, accessToken });
   } catch (error) {
      console.log({ error });
      return res.status(500).json({
         error

      });
   }
};

const signup = async (req, res) => {
   try {
      const { firstName, lastName, email, password, birthday, gender } = req.body;
      // const userExist = await User.findOne({ email });
      // if (userExist) return  res.status(400).json({
      //    message: 'User exist',
         
      // });
      const hash = await bcrypt.hash(password, 8);
      const user = new User({
         _id: mongoose.Types.ObjectId(),
         firstName,
         lastName,
         email,
         password: hash,
         birthday,
         gender
      });

      const accessToken = jwt.sign(
         { id: user._id, email },
         process.env.ACCESS_TOKEN_SECRET,
      );
  
   await user.save();

   return res.status(201).json({
         message: 'User created',
         user,
         accessToken,
      });
   } catch (error) {
      console.log({ error });
      res.status(400).json({
         message: 'Opration Faild',
         error
         
      });
   }
};

const getUserByName = async (req, res) => {
   try {
      const {name} = req.query;
      const users = await User.find({$or: [{firstName: name}, {lastName: name}]})
      res.status(200).json({
         mess: 'sending',
         users
      })

   } catch (error) {
      res.status(500).json({errorMessage: error})      
   }
};

module.exports = { login, signup , getUserByName};
