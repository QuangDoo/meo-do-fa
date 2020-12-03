import { gql } from '@apollo/client';

type Address = {
  partnerId: string;
  isNew: boolean;
  use?: boolean;
  zipCode: number;
  city: string;
  district: string;
  ward: string;
  street: string;
};

type Customer = {
  billing_address?: Address;
  fullName: string;
  phone: string;
  email?: string;
  shipping_address: Address;
};

type OrderInput = {
  orderNo: string;
  customer: Customer;
  paymentMethodId: number;
  deliveryMethodId: number;
  note: string;
  isInvoice: boolean;
};

export type CreateOrderVars = {
  inputs: OrderInput;
};

export type CreateOrderData = {
  createOrder: {
    code: number;
    status: string;
    message: string;
    orderNo: string;
    orderId: number;
  };
};

export const CREATE_ORDER = gql`
  mutation($inputs: OrderInput) {
    createOrder(inputs: $inputs) {
      code
      status
      message
      orderNo
      orderId
    }
  }
`;
