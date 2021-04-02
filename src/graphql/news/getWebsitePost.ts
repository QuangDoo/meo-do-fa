import { gql } from '@apollo/client';

export enum PostType {
  NEWS = 'NEWS',
  HR = 'HR',
  ABOUT = 'ABOUT',
  DISPUTE = 'DISPUTE',
  TOS = 'TOS',
  GPOLICY = 'GPOLICY',
  TOU = 'TOU',
  TAC = 'TAC',
  PPOLICY = 'PPOLICY',
  FAQ = 'FAQ'
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
