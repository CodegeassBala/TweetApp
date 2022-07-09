import React, { useContext } from 'react';
import {gql,useQuery} from '@apollo/client'

import { AuthContext } from '../context/auth';

import PostCard from '../views/PostCard';
import PostForm  from '../views/postFrom';
import {Grid, GridColumn,Transition} from 'semantic-ui-react'

import {FETCH_POSTS_QUERY} from '../utils/getPostmutation'//the gtPosts query is to be used in the createPost form (PostFrom component)also so imoprted separately



function Home() {
  const {user} = useContext(AuthContext);
const {loading,error,data} = useQuery(FETCH_POSTS_QUERY);
// const {loading,error,data} = useQuery(FETCH_POSTS_QUERY);
if(error){
  console.log(error.message);
}
let posts={};
if(!loading){
// console.log(data);
posts = data.getPosts;
}
  return (
   <Grid columns={3}>
     <Grid.Row className='page-title'>
       <h1>Recent Posts</h1>
     </Grid.Row>
     <Grid.Row>
       {user && (
       <Grid.Column>
         <PostForm/>
       </Grid.Column>
       )}
       {loading ? (
         <h1>Loading ...</h1>
       ) : (
         <Transition.Group>
           {
             posts && posts.map(post=>(
              <Grid.Column key={post.id} style = {{marginBottom:20}}>
                <PostCard post = {post}/>
              </Grid.Column>
            ))
           }
         </Transition.Group>
       )
       }
     </Grid.Row>
  </Grid>
  );
}


//all the mutations/queries which we need have to declared in the specific pages again for the client side to info from server

export default Home;
