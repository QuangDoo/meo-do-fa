import { gql } from 'apollo-boost';
import { LoginUserInput } from 'src/types/inputs';
import { LoginUserResponse } from 'src/types/responses';

export type LoginData = {
  login: LoginUserResponse;
};

export type LoginVars = {
  inputs: LoginUserInput;
};

export const LOGIN_USER = gql`
  mutation login($inputs: LoginUserInput!) {
    login(inputs: $inputs) {
      token
      code
      status
      message
    }
  }
`;
