import { gql } from '@apollo/client';

export type SearchResult = {
  id: number;
  slug: string;
  name: string;
};

export const SEARCH_QUERY_ATTRIBUTES = `
  id
  slug
  name
`;

export type SearchProductData = {
  searchProduct: SearchResult[];
};

export type SearchProductVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const SEARCH_PRODUCT = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    searchProduct(page: $page, pageSize: $pageSize, name: $name) {
      ${SEARCH_QUERY_ATTRIBUTES}
    }
  }
`;
