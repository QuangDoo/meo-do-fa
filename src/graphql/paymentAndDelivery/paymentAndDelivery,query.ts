import { gql } from 'apollo-boost';
import { GetPaymentAndDeliveryResponse } from 'src/types/responses';

export type GetPaymentAndDeliveryData = {
  getPaymentAndDeliveryMethod: GetPaymentAndDeliveryResponse;
};

export const GET_PAYMENT_DELIVERY = gql`
  query {
    getPaymentAndDeliveryMethod {
      paymentMethods {
        id
        name
        display_name
        account_name
        account_no
        bank_name
        note
      }
      deliveryMethods {
        id
        name
        display_name
        tax
      }
    }
  }
`;
