import { gql } from '@apollo/client';

export type CreateUserData = {
  createUser: {
    token: string;
    status: string;
    code: number;
    message: string;
  };
};

export type CreateUserInput = {
  phone: string;
  name: string;
  account_type: string;
  password: string;
  email: string;
};

export type CreateUserVars = {
  inputs: CreateUserInput;
};

export const CREATE_USER = gql`
  mutation createUser($inputs: CreateUserInput!) {
    createUser(inputs: $inputs) {
      token
      status
      code
      message
    }
  }
`;
