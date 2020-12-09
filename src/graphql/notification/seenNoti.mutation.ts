import { gql } from '@apollo/client';

export const SEEN_NOTI = gql`
  mutation seenNotify($_id: String!) {
    seenNotify(_id: $_id) {
      code
      status
      message
    }
  }
`;
