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
export type CategorySubData = {
  getCategory: {
    id: number;
    name: string;
    parent_id: number;
    parent_name: string;
  };
};
export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    getCategory(id: $id) {
      id
      name
      parent_id
      parent_name
    }
  }
`;
