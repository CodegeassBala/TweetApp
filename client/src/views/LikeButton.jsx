import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useMutation,gql } from "@apollo/client";

import {Button,Label,Icon} from 'semantic-ui-react'

function LikeButton(props){
    const user = props.user;
    const id = props.postContent.id;
    // console.log(id);
    const likes = props.postContent.likes;
    // console.log(likes[0].username);
    const likeCount = props.postContent.likeCount;
    // console.log(props);
    const [liked,setLiked] = useState(false); 
    let userLiked = false;
    if(user){
    for(let i=0;i<likeCount;i++){
     if(likes[i].username === user.username){
         userLiked = true;
         break;
     }
    }
}
    useEffect(()=>{
        if(user && userLiked){
            setLiked(true);
        }else{
            setLiked(false);
        }
    },[user,likes]);

    const [likePost]  = useMutation(LIKE_POST,{
        variables:{postID:id}
    });

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
        <Icon name='heart' />
      </Button>
        ):(
            <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
        )
    ):(
        <Button  as={Link} to='/login' color='teal' basic>
        <Icon name='heart' />
      </Button>
    )

    return(
        <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    )
}

const LIKE_POST = gql`
mutation likePost($postID:ID!){
    likePost(postID:$postID){
        id
        likes{
            id username
        }
        likeCount
    }
}
`

export default LikeButton;