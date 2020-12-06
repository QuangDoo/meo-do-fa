import { gql } from '@apollo/client';

export type ResetPasswordData = {
  resetPassword: {
    code: number;
    status: string;
    message: string;
  };
};

export type ResetPasswordInput = {
  email: string;
};

export type ResetPasswordVars = {
  inputs: ResetPasswordInput;
};

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(inputs: { email: $email }) {
      code
      status
      message
    }
  }
`;
