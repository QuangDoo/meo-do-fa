import { gql } from '@apollo/client';

export type PaymentMethod = {
  id: number;
  name: string;
  account_name: string;
  account_no: string;
  bank_name: string;
  note: string;
};

export type DeliveryMethod = {
  id: number;
  name: string;
  tax: string;
};

export type GetPaymentAndDeliveryData = {
  getPaymentAndDeliveryMethod: {
    paymentMethods: PaymentMethod[];
    deliveryMethods: DeliveryMethod[];
  };
};

export const GET_PAYMENT_DELIVERY = gql`
  query {
    getPaymentAndDeliveryMethod {
      paymentMethods {
        id
        name
        account_name
        account_no
        bank_name
        note
      }
      deliveryMethods {
        id
        name
        tax
      }
    }
  }
`;
