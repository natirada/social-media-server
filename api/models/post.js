const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   create_date: { type: Date, required: true },
   content: { type: String, required: true },
   image: String,
   likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);
