import { gql } from '@apollo/client';
import { Product } from 'src/types/Product';

export type GetProductsByIngredientData = {
  getProductsByIngredient: Product[];
};

export type GetProductsByIngredientVars = {
  page: number;
  pageSize: number;
  ingredientId: string;
};

export const GET_PRODUCTS_BY_INGREDIENT = gql`
  query($page: Int!, $pageSize: Int!, $ingredientId: String!) {
    getProductByIngredient(page: $page, pageSize: $pageSize, ingredient: $ingredientId) {
      id
      name
      price
      list_price
      standard_price
      image_128
      image_256
      image_512
      uom_name
      is_new
      is_quick_invoice
      is_vn
      is_primary
      is_exclusive
      is_drop_ship
    }
  }
`;
