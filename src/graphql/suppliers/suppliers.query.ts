import { gql } from '@apollo/client';

export type Supplier = {
  id: string;
  name: string;
};

export type GetAllSuppliersData = {
  getSuppliers?: Supplier[];
};

export const GET_ALL_SUPPLIERS = gql`
  query getSuppliers($page: Int!, $pageSize: Int!, $name: String) {
    getSuppliers(page: $page, pageSize: $pageSize, name: $name) {
      id
      name
    }
  }
`;

export type GetSuppliersVars = {
  page: number;
  pageSize: number;
  name?: string;
};

export type GetSupplierDetailsVars = {
  id: number;
};

export const GET_SUPPLIER_DETAIL = gql`
  query($id: Int!) {
    getSupplier(id: $id) {
      id
      name
      comment
      street
      email
      phone
    }
  }
`;
export type GetSupplierDetailsData = {
  getSupplier: {
    id: number;
    name: string;
    short_name: string;
    description: string;
  };
};
