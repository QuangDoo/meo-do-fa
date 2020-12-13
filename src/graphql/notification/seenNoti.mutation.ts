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

export const SEEN_ALL_NOTI = gql`
  mutation seenNotifies {
    seenNotifies {
      code
      status
      message
    }
  }
`;
