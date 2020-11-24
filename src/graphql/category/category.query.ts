import { gql } from '@apollo/client';

export type GetAllCategoriesData = {
  getCategoriesAll: {
    id: number;
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
