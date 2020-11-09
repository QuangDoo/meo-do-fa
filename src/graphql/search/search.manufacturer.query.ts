import { gql } from 'apollo-boost';

export const SEARCH_MANUFACTURERS_BY_NAME = gql`
  query searchManufacturer($page: Int!, $pageSize: Int!, $name: String!) {
    manufacturers(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
    }
  }
`;
