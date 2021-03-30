import { gql } from '@apollo/client';

export type OrderCancelType = {
  id: number;
  name: string;
  info: string;
  code: string;
};

export type GetOrderCancelTypesData = {
  getOrderCancelTypes: OrderCancelType[];
};

export const GET_ORDER_CANCEL_TYPES = gql`
  query {
    getOrderCancelTypes {
      id
      name
      info
      code
    }
  }
`;
