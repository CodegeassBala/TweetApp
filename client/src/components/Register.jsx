import React,{useState,useContext} from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {Form,Button} from 'semantic-ui-react';
import { useLocation } from 'wouter';
import {AuthContext} from '../context/auth'

import{useForm} from '../utils/hooks';

function Register(props) {
  const context = useContext(AuthContext);
  const [, setLocation] = useLocation();//later to be used to redirect user to home page
  const [errors,setErrors] = useState({});//to set errors object and render it iff any errors are found

  const {handleChange,handleSubmit,values} = useForm(registerUser,{
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });

 


//useMutation comes from apollo-client
//onCompleted -> happens only if the mutation occured successfully without any errors and since here if mutation is succesfull user automatically gets stored in the database he redirected to home page 
const [addUser,{loading}] = useMutation(REGISTER_USER,{
  onCompleted:(data)=>{
    context.login(data.register);
    setLocation("/");//redirects user to home page
  },
  onError:(error)=>{
    // error.graphQLErrors[0].extensions.errors -> consists of our errors;
    setErrors(error.graphQLErrors[0].extensions.errors);
  },
  variables:values
});

function registerUser(){
  addUser();
}


//className={loading ? 'loading': '' } given to have a loading animation if data is being loaded,comes from semantic ui
  return (
   <div className='form-container'>
     
     <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading': ''}>
       <h1>Register</h1>
       <Form.Input 
       label='Username'
       type='text'
       name='username'
       placeholder = 'Username'
       value = {values.username}
       onChange={handleChange}
       error={errors.username ? true : false}
       />
       <Form.Input 
       label='Email'
       type='email'
       name='email'
       placeholder = 'Email'
       value = {values.email}
       onChange={handleChange}
       error={errors.email ? true : false}
       />
       <Form.Input 
       label='Password'
       type='password'
       name='password'
       placeholder = 'Password'
       value = {values.password}
       onChange={handleChange}
       error={errors.password ? true : false}
       />
       <Form.Input 
       label='ConfirmPassword'
       type='password'
       name='confirmPassword'
       placeholder = 'ConfirmPassword'
       value = {values.confirmPassword}
       onChange={handleChange}
       error={errors.confirmPassword ? true : false}
       />
       <Button type='submit'  primary>Submit</Button>
       </Form>
        {Object.keys(errors).length > 0 && (
         <div className="ui error message">
         <ul className='list'>
           {Object.values(errors).map(value=>(
             <li key = {value}>{value}</li>
           ))}
         </ul>
       </div> 
       )}
   </div>
  );
}
//mutation syntax/naming is to be followed with refreence to the typedefs
//input : RegisterInput is how i named it in my typedefs
const REGISTER_USER = gql`
mutation register(
$username:String!
$email:String!
$password:String!
$confirmPassword:String!
){
  register(
    input:{
      username:$username
      email:$email
      password:$password
      confirmPassword:$confirmPassword
    }
  ){
    id email username createdAt token
  }
}
`
export default Register;
