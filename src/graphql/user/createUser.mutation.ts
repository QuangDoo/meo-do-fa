import { gql } from '@apollo/client';
import { CreateUserInput } from 'src/types/inputs';
import { LoginUserResponse } from 'src/types/responses';

export type CreateUserData = {
  createUser: LoginUserResponse;
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
