import { gql } from '@apollo/client';

export const GET_NOTI = gql`
  query {
    getNotify {
      id
      subject
      body
      date
      reply_to
      record_name
      write_uid
    }
  }
`;
