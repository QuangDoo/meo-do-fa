import { gql } from '@apollo/client';

export type Notifies = {
  _id: string;
  content: string;
  description: string;
  userId: string;
  isSeen: boolean;
  type: string;
  update_date: string;
  create_date: string;
};

export type GetNotiData = {
  getNotify: {
    Notifies: Notifies[];
    total: number;
  };
};

export type GetNotiVars = {
  page: number;
  pageSize: number;
};

export const GET_NOTI = gql`
  query getNotify($page: Int!, $pageSize: Int!) {
    getNotify(page: $page, pageSize: $pageSize) {
      Notifies {
        _id
        content
        description
        userId
        isSeen
        type
        update_date
        create_date
      }
      total
    }
  }
`;
