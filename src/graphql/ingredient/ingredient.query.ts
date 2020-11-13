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
export const GET_INGREDIENT = gql`
  query getIngredient($id: Int!) {
    getIngredient(id: $id) {
      id
      contraindication
      create_date
      create_uid
      direction
      display_name
      indication
      info
      interaction
      name
      overdose
      pharmacodynamics
      pharmacokinetics
      preservation
      variant_ids
      slug
      status
    }
  }
`;