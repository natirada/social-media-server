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
      res.json({ user, accessToken });
   } catch (error) {
      console.log({ error });
      res.status(500).json({
         message: 'Opration Faild',
      });
   }
};

const signup = async (req, res) => {
   try {
      const { userName, email, password } = req.body;
      const hash = await bcrypt.hash(password, 8);
      const user = new User({
         _id: mongoose.Types.ObjectId(),
         userName,
         email,
         password: hash,
      });

      const accessToken = jwt.sign(
         { id: user._id, email },
         process.env.ACCESS_TOKEN_SECRET,
      );
      await user.save();

      res.status(201).json({
         message: 'User created',
         user,
         accessToken,
      });
   } catch (error) {
      console.log({ error });
      res.status(400).json({
         message: 'Opration Faild',
      });
   }
};

module.exports = { login, signup };
