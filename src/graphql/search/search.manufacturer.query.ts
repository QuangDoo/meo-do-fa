import { gql } from '@apollo/client';

import { SEARCH_QUERY_ATTRIBUTES, SearchResult } from './search.products.query';

export type SearchManufacturerData = {
  searchManufactory: SearchResult[];
};

export type SearchManufacturerVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const SEARCH_MANUFACTURER = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    searchManufactory(page: $page, pageSize: $pageSize, name: $name) {
      ${SEARCH_QUERY_ATTRIBUTES}
    }
  }
`;
