import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  query getAllCategories {
    getCategories {
      id
      name
      complete_name
    }
  }
`;
// getCategories {
//   id
//   name
//   complete_name
// }
