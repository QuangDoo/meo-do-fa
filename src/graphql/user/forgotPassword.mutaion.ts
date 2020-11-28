import { gql } from '@apollo/client';
import { ChangePasswordInput } from 'src/types/inputs';
import { ForgotPasswordResponse } from 'src/types/responses';

export type ForgotPasswordData = {
  forgotPassword: ForgotPasswordResponse;
};

export type ForgotPasswordVars = {
  inputs: ChangePasswordInput;
};

export const FORGOT_PASSWORD = gql`
  mutation changePassword($inputs: ChangePasswordInput!) {
    changePassword(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
