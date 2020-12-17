import { gql } from '@apollo/client';

export type Category = {
  id: number;
  name: string;
  categorySub: Category[];
};

export type GetAllCategoriesData = {
  getCategoriesLevel: Category[];
};

export const GET_ALL_CATEGORIES = gql`
  query {
    getCategoriesLevel {
      id
      name
      categorySub {
        id
        name
      }
    }
  }
`;
