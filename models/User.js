const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  createdAt:String
});

module.exports = mongoose.model("user",UserSchema);
