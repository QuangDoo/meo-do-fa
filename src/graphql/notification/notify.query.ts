import { gql } from '@apollo/client';

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
