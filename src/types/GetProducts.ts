import { Product } from './Product';

export type GetProductsData = {
  getProductByConditions: {
    Products: Product[];
    total: number;
  };
};

export type GetProductsVars = {
  page: number;
  pageSize: number;
  type: string | string[];
  manufacturer_id: string | string[];
  category_id: string | string[];
  order_type: string | string[];
};
export type GetProductsDealVars = {
  page: number;
  pageSize: number;
};
export type GetProductsDealData = {
  getProductsDeal: Product[];
};
