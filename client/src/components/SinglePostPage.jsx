import React, { useContext} from "react";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { useLocation } from "wouter";
import {gql,useQuery} from '@apollo/client'
import { AuthContext } from "../context/auth";
import { Button, Card, CardContent, CardDescription, CardHeader, Grid, Icon,Image,Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../views/LikeButton";
import DeleteButton from "../views/DeleteButton";
import Comments from "./Comments";
import { useHistory } from "react-router";


function SinglePostPage(props){

    const {user} = useContext(AuthContext); 
    const [, setLocation] = useLocation();
//     const history = useHistory();
// console.log(history);
    const postID = useParams().postID;
    // console.log(postID);
    // console.log(props.match);
   
   
   const {loading,error,data} = useQuery(FETCH_POST,{
   variables:{
       postID
   }
   })
   let post={};
   if(error){
       console.log(error.message);
   }
   if(!loading){
    post = data.getPost;
   }
    // const {data} = useQuery(FETCH_POST,{
    //     variables:{postID}
    // })
    // 
    function deletePostCallback(){
    console.log(window.location);
    window.location.assign('/');
    }
    let postMarkup;
  
 if(!post){
     postMarkup = <p>Loading Post ...</p>
 }else if(post){
    //  console.log(post);
     const {id,username,body,commentCount,likeCount,likes,comments,createdAt} = post;
    //  console.log(comments);
     postMarkup = (
         <Grid>
             <Grid.Row>
                 <Grid.Column width={2}>
                 <Image
                 src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
                 size='big'
                 float='left'
                 circular
                />
                 </Grid.Column>
                 <Grid.Column width={10}>
                  <Card fluid>
                      <Card.Content>
                          <Card.Header>{username}</Card.Header>
                          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                          <Card.Description>{body}</Card.Description>
                      </Card.Content>
                      <hr/>
                      <Card.Content extra>
                          <LikeButton user={user} postContent={{id,likes,likeCount}}/>
                          <Button as='div' 
                          labelPosition="right"
                          onClick={()=>console.log('Comment clicked')}
                          >
                              <Button basic color='blue'>
                                  <Icon name='comments'/>
                              </Button>
                              <Label basic color='blue' pointing='left'>
                                  {commentCount}
                              </Label>
                          </Button>
                          {user && user.username === username && (
                              <DeleteButton postID={id} callBack={deletePostCallback}/>
                          )}
                      </Card.Content>
                  </Card>
                  {comments && <Comments comments={comments}/>}
                 </Grid.Column>
             </Grid.Row>
         </Grid>
     );
 }
 return postMarkup;

}

const FETCH_POST = gql`
query($postID:ID!){
    getPost(postID:$postID){
        id body createdAt username likeCount
        likes{
            id
            username
        }
        commentCount
        comments{
            id
            username
            body
            createdAt
            parentID
        }
    }
}
`

export default SinglePostPage;