import { gql } from '@apollo/client';

type ContactAddress = {
  city: string;
  district: string;
  ward: string;
  street: string;
};

export type UpdateUserVars = {
  name?: string;
  display_name?: string;
  email?: string;
  contact_address: ContactAddress;
  company_name?: string;
  vat?: string;
  representative?: string;
  business_license?: string;
};

export type UpdateUserData = {
  updateUser: {
    code: number;
    status: number;
    message: string;
  };
};

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $display_name: String
    $email: String
    $contact_address: ContactAddress
    $company_name: String
    $vat: String
    $representative: String
    $business_license: String
  ) {
    updateUser(
      inputs: {
        name: $name
        display_name: $display_name
        email: $email
        contact_address: $contact_address
        company_name: $company_name
        vat: $vat
        representative: $representative
        business_license: $business_license
      }
    ) {
      code
      status
      message
    }
  }
`;
