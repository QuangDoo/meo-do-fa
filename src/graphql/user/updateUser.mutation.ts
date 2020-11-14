import { gql } from 'apollo-boost';
import { UpdateUserInput } from 'src/types/inputs';

export type UpdateUserVars = {
  inputs: UpdateUserInput;
};

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $display_name: String
    $email: String
    $city: String!
    $district: String!
    $ward: String!
    $street: String!
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
        contact_address: { city: $city, district: $district, ward: $ward, street: $street }
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
