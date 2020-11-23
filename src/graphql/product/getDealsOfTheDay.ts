import { gql } from 'apollo-boost';
import { Product } from 'src/types/Product';

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
      id
      name
      price
      list_price
      standard_price
      image_128
      image_512
      image_256
      uom_name
      is_new
      is_quick_invoice
      is_vn
      is_exclusive
      categories {
        id
        name
      }
    }
  }
`;