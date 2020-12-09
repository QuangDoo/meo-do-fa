import { gql } from '@apollo/client';

export const GET_NOTI = gql`
  query {
    getNotify {
      _id
      content
      userId
      isSeen
      type
      update_date
      create_date
    }
  }
`;
