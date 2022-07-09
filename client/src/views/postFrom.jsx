import React from "react";
import { useMutation,gql } from "@apollo/client";

import {Button, Form} from 'semantic-ui-react';

import {useForm} from '../utils/hooks';//separate hook creates to handle all form requests see te code in file for better understanding

import {FETCH_POSTS_QUERY} from '../utils/getPostmutation';

function PostForm(){

    const { values, handleSubmit,handleChange } = useForm(createPostCallback,
        {
            body:''
        }
        );

    const [createPost,{error}] = useMutation(CREATE_POST,{
        variables:values,
        // refetchQueries:[{query:FETCH_POSTS_QUERY}],//another method to update the client auttomatically after poast updation in server side, but this methods requiers network request wice and hence not recommended 
        // onCompleted:(data)=>{
        //   values.body=''
        // },
        //update connects/changes client side ui immediatly according to server side data through inMemeoryCache(cache)
        //store == cache both are same.
        update:(store,{data})=>{
            const postData = store.readQuery({
                query:FETCH_POSTS_QUERY
            });
            store.writeQuery({
                query:FETCH_POSTS_QUERY,
                data:{
                    getPosts:[data.createPost,...postData.getPosts ]
                }
            });
            values.body=''
        }
    })    

   function  createPostCallback(){
       createPost();
   }

    return(
        <>
<Form onSubmit = {handleSubmit}>
    <h2>Create a post:</h2>
    <Form.Field>
        <Form.Input
        placeholder =  'Yappa Sugena otto webiste ... o'
        name='body'
        onChange = {handleChange}
        value = {values.body}
        error = {error?true:false}
        />
        <Button type = 'submit' color='teal'>Post</Button>
    </Form.Field>
</Form>
{error && (
    <div className="ui error message">
    <ul className="list">
    <li>{error.graphQLErrors[0].message}</li>
    </ul>
    </div>
)}
</>
    );
}

const CREATE_POST = gql`
mutation createPost(
    $body:String!
){
    createPost(body:$body){
        id body createdAt username
        likeCount commentCount
        comments{
            id body username createdAt
        }
        likes{
            id
            username
            createdAt
        }
    }
}
`

export default PostForm;