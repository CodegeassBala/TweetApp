module.exports.validateRegisterInput=(
  username,
  email,
  password,
  confirmPassword
)=>{
  let errors={};
  if(username.trim() === ''){
    errors.username='Username must not be empty'
  }
  if(email.trim() === ''){
    errors.email='email must not be empty'
  }else{
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(regex)){
      errors.email='Please enter a valid email'
    }
  }
  if(password==''){
    errors.password='Password cannot be empty'
  }
  if(password!==confirmPassword){
    errors.password='password and confirmPassword fields do not match'
  }
  return {
      errors,
      valid:Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username,password)=>{
  let errors={};
  if(username.trim() === ''){
    errors.username='Username must not be empty'
  }
  if(password==''){
    errors.password='Password cannot be empty'
  }
  return {
    errors,
    valid:Object.keys(errors).length < 1
  }
}





const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config.js');
const {AuthenticationError} = require('apollo-server');

module.exports.validateUser = (context)=>{
  //context is a object which so contains headers which contain info about the Token
  const authHeader = context.req.headers.authorization;
  if(authHeader){
    //token is a string which consists of two parts one->Bearer two->token
    const token = authHeader.split('Bearer ')[1];
    // console.log(token);
    if(token){
      try{
        const user = jwt.verify(token,SECRET_KEY);
        return user;
      }catch(err){
        throw new AuthenticationError('Your token seems to be invalid/Expired consider signing in again');
      }
    }else{
      throw new Error('Invalid format for auth header');
    }
  }else{
    throw new Error('AuthHeader missing');
  }
}
