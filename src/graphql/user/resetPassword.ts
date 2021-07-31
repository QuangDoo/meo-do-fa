import { gql } from '@apollo/client';

export type ResetPasswordData = {
  code: number;
  status: string;
  message: string;
};

export type ResetPasswordVars = {
  username: string;
};

export const RESET_PASSWORD = gql`
  mutation($username: String!) {
    resetPassword(inputs: { username: $username })
  }
`;
