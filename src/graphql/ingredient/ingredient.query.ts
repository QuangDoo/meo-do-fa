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

export const GET_INGREDIENT_DETAILS = gql`
  query($id: Int!) {
    getIngredient(id: $id) {
      name
      info
      indication
      direction
      contraindication
      interaction
      preservation
      overdose
      pharmacodynamics
      pharmacokinetics
    }
  }
`;

export type GetIngredientDetailsData = {
  getIngredient: {
    name: string;
    info: string;
    indication: string;
    direction: string;
    contraindication: string;
    interaction: string;
    preservation: string;
    overdose: string;
    pharmacodynamics: string;
    pharmacokinetics: string;
  };
};

export type GetIngredientDetailsVars = {
  id: number;
};
