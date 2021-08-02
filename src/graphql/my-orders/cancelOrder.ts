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
  mutation ($orderNo: String!, $type: Int, $content: String) {
    cancelOrder(orderNo: $orderNo, type: $type, content: $content) {
      code
      status
      message
    }
  }
`;
