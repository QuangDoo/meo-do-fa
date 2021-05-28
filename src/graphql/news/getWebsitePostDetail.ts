import { gql } from '@apollo/client';

export type PostDetail = {
  id: number;
  name: string;
  content: string;
  link: string;
  slug: string;
  create_date: Date;
  signature: string;
};
export type GetWebsitePostData = {
  getWebsitePostDetail: PostDetail;
};

export type GetWebsitePostVariables = {
  id: number;
};

export const GET_POST_DETAIL = gql`
  query ($id: Int!) {
    getWebsitePostDetail(id: $id) {
      id
      name
      content
      link
      slug
      create_date
      signature
    }
  }
`;
