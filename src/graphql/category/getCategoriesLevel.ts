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

export const GET_CATEGORIES_LEVEL = gql`
  query {
    getCategoriesLevel {
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
