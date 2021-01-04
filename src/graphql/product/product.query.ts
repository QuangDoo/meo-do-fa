import { gql } from '@apollo/client';

type Category = {
  id: number;
  name: string;
};

type Ingredient = {
  ingredient_id: number;
  name: string;
  amount: string;
};

type Manufacturer = {
  id: number;
  name: string;
  slug: string;
};

export type ProductDetails = {
  id: number;
  name: string;
  list_price: number;
  old_price: number;
  sale_price: number;
  discount_percentage: number;
  is_primary: boolean;
  is_new: boolean;
  is_exclusive: boolean;
  is_vn: boolean;
  is_drop_ship: boolean;
  is_quick_invoice: boolean;
  info: string;
  indication: string;
  contraindication: string;
  direction: string;
  interaction: string;
  preservation: string;
  overdose: string;
  pharmacodynamics: string;
  pharmacokinetics: string;
  image_128: string;
  image_512: string;
  image_256: string;
  packing_unit: string;
  categories: Category[];
  ingredients: Ingredient[];
  manufacturer: Manufacturer;
  badges: string[];
};

export type GetProductData = {
  getProduct: ProductDetails;
};

export type GetProductVars = {
  id: number;
};

export const GET_PRODUCT = gql`
  query getProduct($id: Int!) {
    getProduct(id: $id) {
      id
      name
      list_price
      old_price
      sale_price
      discount_percentage
      is_primary
      is_new
      is_exclusive
      is_vn
      is_drop_ship
      is_quick_invoice
      info
      indication
      contraindication
      direction
      interaction
      preservation
      overdose
      pharmacodynamics
      pharmacokinetics
      image_128
      image_512
      image_256
      packing_unit
      categories {
        id
        name
      }
      ingredients {
        ingredient_id
        name
        amount
      }
      manufacturer {
        id
        name
        slug
      }
      badges
    }
  }
`;
