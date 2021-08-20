const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   userName: { type: String, required: true },
   password: { type: String, required: true },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
   },
   country: String,
   firstName: String,
   lastName: String,
   image: String,
});

module.exports = mongoose.model('User', userSchema);
