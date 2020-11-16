import { gql } from 'apollo-boost';

export const GET_MANUFACTORIES = gql`
  query getManufactories($page: Int!, $pageSize: Int!) {
    getManufactories(page: $page, pageSize: $pageSize) {
      id
      name
    }
  }
`;
// getCategories {
//   id
//   name
//   complete_name
// }
