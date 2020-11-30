import { gql } from '@apollo/client';

import { CancelOrderResponse } from '../../types/responses';

export type CancelOrderData = {
  cancelOrder: CancelOrderResponse;
};

export type CancelOrderVars = {
  id: string;
};

export const CANCEL_ORDER = gql`
  mutation($id: string!) {
    cancelOrder(id: $id) {
      code
      status
      message
    }
  }
`;
