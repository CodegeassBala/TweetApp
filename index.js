const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./conroller/graphQL/typedefs');
const resolvers = require('./conroller/graphQL/resolvers');
const {MONGODB} = require('./config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req})
});

mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{
  console.log(`MongoDB connected`);
  return server.listen({port:5000})
})
.then((res)=>{
  console.log(`Server running at ${res.url}`);
})
.catch((error)=>{
  console.log(error);
})
