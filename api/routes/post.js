const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getPosts);

router.post('/', upload.single('image'), postController.creatNewPost);

module.exports = router;
