import { gql } from '@apollo/client';

export type Category = {
  id: number;
  name: string;
};

export type GetAllCategoriesData = {
  getCategoriesAll: Category[];
};

export const GET_ALL_CATEGORIES = gql`
  query {
    getCategoriesAll {
      id
      name
    }
  }
`;
