import { gql } from '@apollo/client';

export type ResetPasswordData = {
  code: number;
  status: string;
  message: string;
};

export type ResetPasswordVars = {
  email: string;
};

export const RESET_PASSWORD = gql`
  mutation($email: String!) {
    resetPassword(inputs: { email: $email })
  }
`;
