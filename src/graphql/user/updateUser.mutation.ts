import { gql } from 'apollo-boost';
import { UpdateUserInput } from 'src/types/inputs';

export type UpdateUserVars = {
  inputs: UpdateUserInput;
};

export const UPDATE_USER = gql`
  mutation updateUser($inputs: CreateUserInput!) {
    updateUser(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
