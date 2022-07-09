import {gql} from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id body username likeCount commentCount createdAt
    comments{
      id
      body
      username
      parentID
    }
    likes{
      id
      username
    }
  }
}
`