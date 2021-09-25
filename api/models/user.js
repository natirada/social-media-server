const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   password: { type: String, required: true },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   firstName:  { type: String, required: true },
   lastName:  { type: String, required: true },
   birthday: { type: Date, required: true },
   gender: { type: String, required: true },
   country: String,
   image: String,
   friends: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Friendship'}]
});

module.exports = mongoose.model('User', userSchema);
