import React,{useContext} from 'react'
import moment from 'moment'//moment helps us get the date/time(createdAt) relevant to current time(like 2 hr ago or few swconds ago etc..)
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function likePost(){
    console.log("like");
}

function commentPost(){
    console.log("comment");
}

function PostCard(props){

  const {user} = useContext(AuthContext);

const {body,id,comments,likeCount,commentCount,createdAt,username,likes} = props.post;//post is given to the postcard from the home page code
return(
<Card fluid>
      <Card.Content>
        <Image style={{width:50, height:50}}
          floated='right'
          circular
          src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as = {Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} postContent={{id,likes,likeCount}}/>
    <Button  labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button color='teal' basic>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    {user && user.username === username && <DeleteButton postID={id}/>}
      </Card.Content>
    </Card>
);
}

export default PostCard;
