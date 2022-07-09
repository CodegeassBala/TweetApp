const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const User = require('../../../models/User.js');
const {SECRET_KEY} = require('../../../config.js');
const {validateRegisterInput,validateLoginInput} = require('../../validate.js');

function createToken(user){
  return jwt.sign({
    id:user.id,
    email:user.email,
    username:user.username
  },SECRET_KEY,{expiresIn:'1h'});
}

module.exports = {
  Mutation: {
    // register(parent,args,context,info)
    // parent contains info about the previous step/creation but as this is the first step it would be null here and hence(_)
    //args contain the type of arguments here RegisterInput
    //
    //info contains general information like metadata.

    async register(_,
      { input: {
      username,
      email,
      password,
      confirmPassword
    }
    }) {
      //validate user data
     const {errors,valid} = validateRegisterInput(username,
     email,
     password,
     confirmPassword);

     if(!valid){
       throw new UserInputError('Errors',{errors});
     }
      //make sure user doesnt already exist
       const user = await User.findOne({username});

       if(user){
         throw new UserInputError('Username is taken',{
           errors:{
             username:'This username is already taken'
           }
         });
       }
       const usedemail = await User.findOne({email});
       if(usedemail){
         throw new UserInputError('Email is taken',{
           errors:{
             email:'An account exists with this email'
           }
         });
       }

      //hash password before u store it and creaate a auth token
      password = await bcrypt.hash(password,12);

      const newUser = new User({
        username,
        email,
        password,
       createdAt:new Date().toISOString()
     });
     const res = await newUser.save();
     const token = createToken(res);

     return{
       ...res._doc,
       id:res._id,
       token
     }
   },
   //login resolver
   async login(_,{username,password}){
     const {errors,valid} = validateLoginInput(username,password);
     if(!valid){
       throw new UserInputError('Errors',{errors});
     }
     const existinguser = await User.findOne({username});
     if(!existinguser){
       throw new UserInputError('USER NOT FOUND',
       {
         errors:'no user exists with the given username'
       });
     }
     const match = await bcrypt.compare(password, existinguser.password);
     if(!match){
       throw new UserInputError('Invalid credentials',
       {
         errors:'Invalid credentials'
       });
     }
     const token = createToken(existinguser);

     return {
      ... existinguser._doc,
       id:existinguser._id,
       token
     }
   }

  }
}
