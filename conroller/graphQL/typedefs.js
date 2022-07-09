const {
  gql
} = require('apollo-server');

module.exports = gql`
     type User{
      id:ID!
      username:String!
      createdAt:String!
      email:String!
      token:String!
    }
    type Post{
      id:ID!
      body:String!
      username:String!
      createdAt:String!
      comments:[Comment]
      likes:[Like]!
      likeCount:Int!
      commentCount:Int!
    }
    type Comment{
      body:String!
      username:String!
      createdAt:String!
      id:ID!
      parentID:ID!
    }
    type Like{
      username:String!
      createdAt:String!
      id:ID!
    }
    input RegisterInput{
      username:String!
      email:String!
      password:String!
      confirmPassword:String!
    }
    type Query{
       getPosts:[Post],
       getPost(postID:ID!):Post
    }
    type Mutation{
      register(input:RegisterInput):User!
      login(username:String!,password:String!):User!
      createPost(body:String!):Post!
      deletePost(postID:ID!):String!
      commentPost(postID:String!,body:String!,commentID:String!):Post!
      deleteComment(postID:ID!,commentID:ID!):Post!
      likePost(postID:ID!):Post!
    }
  `;
