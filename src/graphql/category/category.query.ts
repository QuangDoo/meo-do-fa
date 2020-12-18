import { gql } from '@apollo/client';

export type Category = {
  id: number;
  name: string;
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
      categorySub {
        id
        name
      }
    }
  }
`;

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

export type CategoryVar = {
  id: number;
};
export type CategoryData = {
  getCategory: Category;
};
export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    getCategory(id: $id) {
      id
      name
    }
  }
`;
