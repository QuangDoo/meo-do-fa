import { gql } from '@apollo/client';

export type ResetPasswordData = {
  resetPassword: {
    code: number;
    status: string;
    message: string;
  };
};

export type SaveMailSubscriber = {
  email: string;
};

export type ResetPasswordVars = {
  inputs: { username: string };
};

export const RESET_PASSWORD = gql`
  mutation resetPassword($username: String!) {
    resetPassword(inputs: { username: $username }) {
      code
      status
      message
    }
  }
`;
