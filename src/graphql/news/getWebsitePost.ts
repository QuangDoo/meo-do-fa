import { gql } from '@apollo/client';

export enum PostType {
  NEWS = 'NEWS',
  HR = 'HR'
}
export type PostInputVars = {
  type: PostType;
};
export type WebsitePostData = {
  getWebsitePost: {
    id: number;
    name: string;
    content: string;
    link: string;
    slug: string;
  }[];
};

export const GET_POST = gql`
  query($type: PostType) {
    getWebsitePost(type: $type) {
      id
      name
      type
      content
      link
      slug
    }
  }
`;
