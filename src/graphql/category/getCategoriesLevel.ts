import { gql } from '@apollo/client';

export type Category = {
  id: number;
  name: string;
  priority: number;
  categorySub: Category[];
};

export type GetCategoriesLevelData = {
  getCategoriesLevel: Category[];
};

export type GetCategoryLevelVar = {
  isSpecial?: boolean;
};

export const GET_CATEGORIES_LEVEL = gql`
  query($isSpecial: Boolean) {
    getCategoriesLevel(isSpecial: $isSpecial) {
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
