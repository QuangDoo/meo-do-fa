import { gql } from 'apollo-boost';
import { Category } from 'src/types/Category';

export type GetCategoriesData = {
  getCategories: Category[];
};

export const GET_CATEGORIES = gql`
  query {
    getCategoriesAll {
      id
      name
    }
  }
`;
