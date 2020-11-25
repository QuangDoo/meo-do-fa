import { gql } from '@apollo/client';

export const SEARCH_PRODUCTS_BY_NAME = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    searchProduct(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
    }
  }
`;
