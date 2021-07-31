import { gql } from '@apollo/client';

export enum OrderFlag {
  ALL = 0,
  WAIT_RECEIVE = 10,
  RECEIVED = 15,
  CONFIRMED = 20,
  HANDLING = 30,
  DELIVERING = 40,
  COMPLETED = 80,
  CANCELED = 25
}

export type Order = {
  id: string;
  orderNo: string;
  date_order: string;
  expected_date: string;
  is_expired: boolean;
  flag: OrderFlag;
};

export type GetOrderListData = {
  getOrderList: Order[];
};

export type GetOrderListVars = {
  page: number;
  pageSize: number;
  flag?: OrderFlag;
};

export const GET_ORDER_LIST = gql`
  query($page: Int!, $pageSize: Int!, $flag: Int) {
    getOrderList(page: $page, pageSize: $pageSize, flag: $flag) {
      id
      orderNo
      date_order
      expected_date
      is_expired
      flag
    }
  }
`;
