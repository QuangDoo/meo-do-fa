import { gql } from '@apollo/client';

export type ChangePasswordData = {
  code: number;
  status: string;
  message: string;
};

export type ChangePasswordInput = {
  phone: string;
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordVars = {
  inputs: ChangePasswordInput;
};

export const CHANGE_PASSWORD = gql`
  mutation changePassword($inputs: ChangePasswordInput!) {
    changePassword(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
