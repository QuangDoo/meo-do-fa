import { gql } from '@apollo/client';

export type delLikeProductVar = {
  productId: number;
};

export type delLikeProductData = {
  code: number;
  status: string;
  message: string;
};

export const DEL_LIKEPRODUCT = gql`
  mutation deleteWishProduct($productId: Int!) {
    deleteWishProduct(productId: $productId) {
      code
      message
      status
    }
  }
`;
