import React,{useState,useContext} from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {Form,Button} from 'semantic-ui-react';
import { useLocation } from 'wouter';
import {AuthContext} from '../context/auth';
import {useForm} from '../utils/hooks';

function Login(props) {
  
  const context = useContext(AuthContext);
  const [, setLocation] = useLocation();//later to be used to redirect user to home page
  const [errors,setErrors] = useState({});//to set errors object and render it iff any errors are found
 
  const {handleSubmit,handleChange,values} = useForm(loginUserCallback,{
    username:'',
    password:''
  });

//useMutation comes from apollo-client
//onCompleted -> happens only if the mutation occured successfully without any errors and since here if mutation is succesfull
const [loginUser,{loading}] = useMutation(LOGIN_USER,{
  onCompleted:(data)=>{
    context.login(data.login);
    setLocation("/");//redirects user to home page
    // window.location.assign('/');
  },
  onError:(error)=>{
    // error.graphQLErrors[0].extensions.errors -> consists of our errors;
    setErrors(error.graphQLErrors[0].extensions.errors);
  },
  variables:values
});

function loginUserCallback(){
  loginUser();
}

//className={loading ? 'loading': '' } given to have a loading animation if data is being loaded,comes from semantic ui
  return (
   <div className='form-container'>
     
     <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading': ''}>
       <h1>Login</h1>
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
       label='Password'
       type='password'
       name='password'
       placeholder = 'Password'
       value = {values.password}
       onChange={handleChange}
       error={errors.password ? true : false}
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
const LOGIN_USER = gql`
mutation login(
$username:String!
$password:String!
){
  login(
    username:$username
    password:$password
  ){
    id email username createdAt token
  }
}
`
export default Login;
