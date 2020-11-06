import { gql } from 'apollo-boost';

export const GET_INGREDIENTS = gql`
  query getAllGredients($page: Int!, $pageSize: Int!) {
    getIngredients(input: { setPage: { page: $page, pageSize: $pageSize } }) {
      id
      name
      slug
    }
  }
`;
