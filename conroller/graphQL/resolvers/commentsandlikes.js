const Post = require('../../../models/Post.js');
const {validateUser} = require('../../validate.js');
const {UserInputError,AuthenticationError} = require('apollo-server')
module.exports = {
  Mutation:{
    async commentPost(_,{postID,body,commentID},context){
      const {username} = validateUser(context);
      if(body.trim() === ''){
        throw new UserInputError('Empty Comment',{
          error:{
            body:'comment body should not be empty'
          }
        });
      }
      // console.log(user.username);
      const p = commentID;
      const post = await Post.findById(postID);
      if(post){
        post.comments.unshift({
          body,
          username:username,
          createdAt:new Date().toISOString(),
          parentID:p
        });
        await post.save();
        return post;
      }else{
        throw new UserInputError('Post not found');
      }
    },
    async deleteComment(_,{postID,commentID},context){
      const {username} = validateUser(context);
      const post = await Post.findById(postID);
      if(post){
        const commentIndex = post.comments.findIndex(c=>c.id === commentID);
        if(post.comments[commentIndex].username === username){
          post.comments.splice(commentIndex,1);
          await post.save();
          return post;
        }else{
          throw new AuthenticationError('U are not authorized to delete others comment');
        }
      }else{
        throw new UserInputError('Post not found');
      }
    },
    async likePost(_,{postID},context){
      const {username} = validateUser(context);
      // console.log()
      const post = await Post.findById(postID);
       if(post){
         if(post.likes.find(like=>like.username === username)){
           //post already liked by the user unlike import PropTypes from 'prop-types'
           post.likes = post.likes.filter(like=>like.username !== username);
           await post.save();
           return post;
         }else{
         post.likes.push({
           username,
           createdAt:new Date().toISOString()
         });
         await post.save();
         return post;
       }
       }else{
         throw new UserInputError('Post not found');
       }
    }

  }
}
