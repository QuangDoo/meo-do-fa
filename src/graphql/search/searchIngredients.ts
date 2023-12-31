import { gql } from '@apollo/client';

import { SEARCH_QUERY_ATTRIBUTES, SearchResult } from './searchProducts';

export type SearchIngredientData = {
  searchIngredients: SearchResult[];
};

export type SearchIngredientVars = {
  page: number;
  pageSize: number;
  name: string;
};

export const SEARCH_INGREDIENT = gql`
  query($page: Int!, $pageSize: Int!, $name: String!) {
    searchIngredients(page: $page, pageSize: $pageSize, name: $name) {
      ${SEARCH_QUERY_ATTRIBUTES}
    }
  }
`;
