import { gql } from '@apollo/client';

export type CategoryVar = {
  id: number;
};
export type CategorySubData = {
  getCategory: {
    id: number;
    name: string;
    parent_id: number;
    parent_name: string;
  };
};
export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    getCategory(id: $id) {
      id
      name
      parent_id
      parent_name
    }
  }
`;
