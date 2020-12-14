import { gql } from '@apollo/client';

export type CountCartData = {
  countCarts: {
    data: number;
  };
};

export const COUNT_CART = gql`
  query {
    countCarts {
      data
    }
  }
`;
