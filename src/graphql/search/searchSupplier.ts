import { gql } from '@apollo/client';

import { SEARCH_QUERY_ATTRIBUTES, SearchResult } from './searchProducts';

export type SearchSupplierData = {
  searchManufactory: SearchResult[];
};

export type SearchSupplierVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const SEARCH_SUPPLIER = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    getSuppliers(page: $page, pageSize: $pageSize, name: $name) {
      ${SEARCH_QUERY_ATTRIBUTES}
    }
  }
`;
