import { gql } from '@apollo/client';

import { CancelOrderResponse } from '../../types/responses';

export type CancelOrderData = {
  cancelOrder: CancelOrderResponse;
};

export type CancelOrderVars = {
  id: number;
};

export const CANCEL_ORDER = gql`
  query($id: Int!) {
    cancelOrder(id: $id) {
      code
      status
      message
    }
  }
`;
