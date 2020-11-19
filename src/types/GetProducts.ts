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
  order_type: string | string[];
  type?: string | string[];
  manufacturer_id?: string | string[];
  category_id?: string | string[];
};
