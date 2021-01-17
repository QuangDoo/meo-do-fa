import { gql } from '@apollo/client';

import { Category } from './getCategoriesLevel';

export type searchCategoriesData = {
  searchCategories: Category[];
};

export type searchCategoriesVars = {
  keyword: string;
};

export const SEARCH_CATEGORY = gql`
  query searchCategories($keyword: String!) {
    searchCategories(keyword: $keyword) {
      id
      name
      priority
      categorySub {
        id
        name
      }
    }
  }
`;
