import { gql } from '@apollo/client';

export type PostVar = {
  id: number;
};

export type PostData = {
  getWebsitePostDetail: {
    id: number;
    name: string;
    link: string;
    content: string;
  };
};

export const GET_POST = gql`
  query getWebsitePostDetail($id: Int!) {
    getWebsitePostDetail(id: $id) {
      id
      name
      link
      content
    }
  }
`;
