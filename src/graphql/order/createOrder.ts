import { gql } from '@apollo/client';

type Info = {
  fullName?: string;
  phone?: string;
  email?: string;
  tax?: string;
  partnerId: number;
  isNew: boolean;
  use?: boolean;
  zipCode: number;
  city: string;
  city_id: number;
  district: string;
  district_id: number;
  ward: string;
  ward_id: number;
  street: string;
};

type Customer = {
  billing_address?: Info;
  fullName: string;
  phone: string;
  email?: string;
  shipping_address: Info;
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
  mutation ($inputs: OrderInput) {
    createOrder(inputs: $inputs) {
      code
      status
      message
      orderNo
      orderId
    }
  }
`;
