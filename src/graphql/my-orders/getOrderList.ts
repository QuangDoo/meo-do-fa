import { gql } from '@apollo/client';

export type OrderFlag = '10' | '20' | '25' | '30' | '40' | '80';

export type GetOrderList = {
  id: string;
  orderNo: string;
  date_order: string;
  expected_date: string;
  order_lines: {
    price_total: number;
  }[];
  is_expired: boolean;
  flag: OrderFlag;
};

export type GetOrderListData = {
  getOrderList: GetOrderList[];
};

export type GetOrderListVars = {
  page: number;
  pageSize: number;
};

export const GET_ORDER_LIST = gql`
  query($page: Int!, $pageSize: Int!) {
    getOrderList(page: $page, pageSize: $pageSize) {
      id
      orderNo
      date_order
      expected_date
      order_lines {
        price_total
      }
      is_expired
      flag
    }
  }
`;
