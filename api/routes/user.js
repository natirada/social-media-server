const express = require('express');
const { validateSignUp } = require('../middleware/validate-auth');
const authRouter = require('../controllers/user');

const router = express.Router();

router.post('/signup', validateSignUp, authRouter.signup);

router.post('/login', authRouter.login);

module.exports = router;
