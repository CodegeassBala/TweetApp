const Post = require('../../../models/Post.js');
const {validateUser} = require('../../validate.js');

module.exports = {
  Query:{
    async getPosts(){
      try{
      const post = Post.find().sort({createdAt:-1});
      return post;
    }catch(err){
      throw new Error(err);
    }
  },
    async getPost(_,{postID}){
      try{
        if(postID.length!==24){
          throw new Error('Invalid post id');
        }
        const post = await Post.findById(postID);
        if(post){
          return post;
        }else{
          console.log("post not found");
          throw new Error("Post not found");
        }
      }catch(err){
        console.log(err);
        throw new Error(err);
      }
    }

  },//crete and delete post mutations
  Mutation:{
    async createPost(_,{body},context){
    const user = await validateUser(context);
    if(body.trim() === ''){
      throw new Error('Post body must not be empty');
    }
    const newpost = new Post({
      body,
      user:user.id,
      username:user.username,
      createdAt:new Date().toISOString(),
      comments:[],
      likes:[]
    });
    const post = await newpost.save();
    return post;
  },
    async deletePost(_,{postID},context){
    const user = await validateUser(context);
    try{
    const post = await Post.findById(postID);
    if(user.username === post.username){
      await post.delete();
      return 'post deeted successfully';
    }else{
      throw new AuthenticationError('U are not authorized to delete this post');
    }
  }catch(err){
    throw new Error(err);
  }
    }
  }
}
