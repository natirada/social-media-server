const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { validateAuth } = require('./api/middleware/validate-auth');

const app = express();

const authRoutes = require('./api/routes/user');
const postRoutes = require('./api/routes/post');

mongoose.connect(
   `mongodb+srv://nati:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.rngbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
   {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
   },
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/post', validateAuth, postRoutes);
app.use('/frindes', validateAuth, postRoutes);

module.exports = app;
