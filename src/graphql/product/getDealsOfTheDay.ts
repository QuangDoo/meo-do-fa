import { gql } from '@apollo/client';
import { Product, productCardQueryProps } from 'src/graphql/product/getProducts';

export type GetDealsOfTheDayData = {
  getProductDealOfTheDay: Product[];
};

export type GetDealsOfTheDayVars = {
  page: number;
  pageSize: number;
};

export const GET_DEALS_OF_THE_DAY = gql`
  query($page: Int!, $pageSize: Int!) {
    getProductDealOfTheDay(page: $page, pageSize: $pageSize) {
      ${productCardQueryProps}
    }
  }
`;
