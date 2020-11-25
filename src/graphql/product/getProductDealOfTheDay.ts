import { gql } from '@apollo/client';
import { Product } from 'src/types/Product';

export const GET_PRODUCTS_DEAL_OF_THE_DAY = gql`
  query getProductDealOfTheDay($page: Int!, $pageSize: Int!) {
    getProductDealOfTheDay(page: $page, pageSize: $pageSize) {
      id
      name
      display_name
    }
  }
`;

export type GetProductDealOfTheDayData = {
  getProductDealOfTheDay: Product[];
};

export type GetProductDealOfTheDayVars = {
  page: number;
  pageSize: number;
};
