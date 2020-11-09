import { Product } from './Product';

export type GetProductsData = {
  getProducts: Product[];
};

export type GetProductsVars = {
  page: number;
  pageSize: number;
};
