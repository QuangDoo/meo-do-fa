import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation createUser(
    $name: String!
    $display_name: String!
    $email: String!
    $contact_address: String!
    $company_name: String
    $vat: String
    $representative: String
    $business_license: String
  ) {
    createUser(
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
      status
      code
      message
    }
  }
`;
