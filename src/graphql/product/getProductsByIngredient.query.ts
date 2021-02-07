import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetProductsByIngredientData = {
  getProductByIngredient: Product[];
};

export type GetProductsByIngredientVars = {
  page: number;
  pageSize: number;
  ingredientId: string;
};

export const GET_PRODUCTS_BY_INGREDIENT = gql`
  query($page: Int!, $pageSize: Int!, $ingredientId: String!) {
    getProductByIngredient(page: $page, pageSize: $pageSize, ingredient: $ingredientId) {
      ${productCardQueryProps}
    }
  }
`;
