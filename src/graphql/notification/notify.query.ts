import { gql } from '@apollo/client';

export type GetNotiData = {
  getNotify: {
    _id: string;
    content: string;
    userId: string;
    isSeen: boolean;
    type: string;
    update_date: string;
    create_date: string;
  }[];
};

export const GET_NOTI = gql`
  query getNotify {
    getNotify {
      _id
      content
      description
      userId
      isSeen
      type
      update_date
      create_date
    }
  }
`;
