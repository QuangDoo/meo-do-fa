import { gql } from '@apollo/client';

type Category = {
  id: number;
  name: string;
  parent_id: number;
  parent_name: string;
};

type Ingredient = {
  name: string;
  amount: string;
  ingredient_id: number;
};

type Manufacturer = {
  id: number;
  name: string;
  slug: string;
};

export type ProductDetail = {
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
  is_available: boolean;
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
  slug: string;
  default_vendor: string;
  default_vendor_id: string;
  sub_images: string[];
};

export type GetProductData = {
  getProduct: ProductDetail;
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
      is_available
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
        parent_id
        parent_name
      }
      ingredients {
        ingredient_id
        name
        amount
        ingredient_id
      }
      manufacturer {
        id
        name
        slug
      }
      badges
      slug
      default_vendor
      default_vendor_id
      sub_images
    }
  }
`;
