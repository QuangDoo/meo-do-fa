import { gql } from '@apollo/client';

export type CreateWishProductVars = {
  productId: number;
  productName: string;
};

export type CreateWishProductData = {
  code: number;
  status: string;
  message: string;
};

export const LIKE_PRODUCT = gql`
  mutation likeProduct($productId: Int!, $productName: String!) {
    likeProduct(inputs: { productId: $productId, productName: $productName }) {
      code
      status
      message
    }
  }
`;
