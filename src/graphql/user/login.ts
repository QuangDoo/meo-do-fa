import { gql } from '@apollo/client';

export type LoginData = {
  login: {
    token: string;
    status: string;
    code: number;
    message: string;
  };
};

export type LoginUserInput = {
  phone: string;
  password: string;
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
