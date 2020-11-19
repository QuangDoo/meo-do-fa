import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query {
    getCategoriesAll {
      id
      name
      complete_name
    }
  }
`;
