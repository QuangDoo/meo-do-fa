import { gql } from '@apollo/client';

export type GetAllCategoriesData = {
  getCategoriesAll: {
    id: string;
    name: string;
  }[];
};

export const GET_ALL_CATEGORIES = gql`
  query {
    getCategoriesAll {
      id
      name
    }
  }
`;
