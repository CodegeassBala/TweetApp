const postResolver = require('./post.js');
const userResolver = require('./user.js');
const commentResolver = require('./commentsandlikes.js');
module.exports = {
  Post:{
    likeCount(parent){
      return parent.likes.length;
    },
    commentCount(parent){
      return parent.comments.length;
    }
  },
  Query:{
    ...postResolver.Query
  },
  Mutation:{
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation
  }
}
