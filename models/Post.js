const mongoose = require('mongoose');

const PostShema = new mongoose.Schema({
  // _id:Object,
  body:String,
  username:String,
  createdAt:String,
  comments:[{
    body:String,
    username:String,
    createdAt:String,
    parentID:String
  }],
  likes:[
    {
      username:String,
      createdAt:String
    }
  ],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  }
})

module.exports = mongoose.model("post",PostShema);
