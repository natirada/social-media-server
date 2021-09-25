const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.validateAuth = (req, res, next) => {
   try {
      const [_, token] = req.headers.authorization.split(' ');
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!userData)
       return  res.status(400).json({
            error: 'Not Authruized',
         });
      req.body.user = userData;
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
         password: Joi.string().min(8).max(10).required(),
         email: Joi.string().email().required(),
         country: Joi.string(),
         firstName: Joi.string().min(2).max(30).required(),
         lastName: Joi.string().min(2).max(30).required(),
         birthday: Joi.date().required(),
         gender: Joi.string().required(),
      });

      const { error, value } = singupSchema.validate(req.body);

      if (error) return res.status(400).json({
         error,
      });
      
      next();

  
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
