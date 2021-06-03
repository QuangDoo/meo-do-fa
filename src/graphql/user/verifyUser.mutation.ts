import { gql } from '@apollo/client';

export type verifyUserData = {
  code: number;
  status: string;
  message: string;
};

export type verifyUserVar = {
  otp: string;
};

export const VERIFY_USER = gql`
  mutation($otp: String!) {
    verifyUser(otp: $otp) {
      code
      status
      message
    }
  }
`;
