import { gql } from '@apollo/client';

export type CancelOrderData = {
  cancelOrder: {
    code: number;
    status: string;
    message: string;
  };
};

export type CancelOrderVars = {
  id: string;
};

export const CANCEL_ORDER = gql`
  mutation($orderNo: String!) {
    cancelOrder(orderNo: $orderNo) {
      code
      status
      message
    }
  }
`;
