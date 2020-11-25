import { gql } from '@apollo/client';

export const SEARCH_MANUFACTURERS_BY_NAME = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    searchManufactory(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
    }
  }
`;
