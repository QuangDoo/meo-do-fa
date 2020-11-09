import { gql } from 'apollo-boost';

export const GET_INGREDIENTS = gql`
  query getAllGredients($page: Int!, $pageSize: Int!) {
    getIngredients(input: { setPage: { page: $page, pageSize: $pageSize } }) {
      id
      contraindication
      display_name
      direction
      indication
      info
      interaction
      name
      overdose
      pharmacodynamics
      pharmacokinetics
      preservation
      slug
      create_date
      status
    }
  }
`;
