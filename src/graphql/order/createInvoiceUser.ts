import { gql } from '@apollo/client';

type IdAndName = {
  id: number;
  name: string;
};
type ContactAddress = {
  city: IdAndName;
  district: IdAndName;
  ward: IdAndName;
  street: string;
};

type OrderInput = {
  fullName: string;
  email?: string;
  shipping_address: ContactAddress;
  phone: string;
  id: number;
};

export type CreateInvoiceUserVars = {
  inputs: OrderInput;
};

export type CreateInvoiceUserData = {
  createInvoiceUser: {
    code: number;
    status: string;
    message: string;
  };
};

export const CREATE_INVOICE_USER = gql`
  mutation($inputs: OrderInput) {
    createInvoiceUser(inputs: $inputs) {
      code
      message
      status
    }
  }
`;
