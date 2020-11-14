import { gql } from 'apollo-boost';

export const SEARCH_PRODUCTS_BY_NAME = gql`
  query searchProduct($page: Int!, $pageSize: Int!, $name: String) {
    products(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
    }
  }
`;
