import { useQuery } from '@apollo/client';
import {
  GET_POST,
  PostInputVars,
  PostType,
  WebsitePostData
} from 'src/graphql/news/getWebsitePost';

export default function useWebsitePost(postType: string) {
  const { data: postList } = useQuery<WebsitePostData, PostInputVars>(GET_POST, {
    variables: {
      type: PostType[postType]
    }
  });

  return postList?.getWebsitePost;
}
