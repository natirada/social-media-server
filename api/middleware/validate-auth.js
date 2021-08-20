const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.validateAuth = (req, res, next) => {
   try {
      const [_, token] = req.headers.authorization.split(' ');
      const isAuth = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!isAuth)
         res.status(400).json({
            error: 'Not Authruized',
         });

      next();
   } catch (error) {
      res.status(400).json({
         error: 'Not Authruized',
      });
   }
};

exports.validateSignUp = (req, res, next) => {
   try {
      const singupSchema = Joi.object({
         userName: Joi.string().min(2).max(30).required(),
         password: Joi.string().min(8).max(10).required(),
         repeat_password: Joi.any().valid(Joi.ref('password')).required(),
         email: Joi.string().email().required(),
         country: Joi.string(),
         firstName: Joi.string().min(2).max(30).required(),
         lastName: Joi.string().min(2).max(30).required(),
      });

      const { error, value } = singupSchema.validate(req.body);

      if (!error) next();

      res.status(400).json({
         error,
      });
   } catch (error) {
      console.log({ error });
      res.status(400).json({
         error: 'Singup Faild',
      });
   }
};

exports.validateSignIn = (req, res, next) => {
   try {
      const singinSchema = Joi.object({
         password: Joi.string().min(8).max(10).required(),
         email: Joi.string().email().required(),
      });

      const { error, value } = singinSchema.validate(req.body);

      if (!error) next();

      res.status(400).json({
         error,
      });
   } catch (error) {
      console.log({ error });
      res.status(400).json({
         error: 'Singup Faild',
      });
   }
};
