import { gql } from '@apollo/client';

export type PostDetail = {
  id: number;
  name: string;
  content: string;
  content_en: string;
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
      content_en
      link
      slug
      create_date
      signature
    }
  }
`;
