import { gql } from '@apollo/client';

export const GET_ALL_INGREDIENTS = gql`
  query {
    getIngredientsAll {
      id
      name
    }
  }
`;

export type GetAllIngredientsData = {
  getIngredientsAll: {
    id: string;
    name: string;
  }[];
};

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
