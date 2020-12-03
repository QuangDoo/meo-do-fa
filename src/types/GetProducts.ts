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
  order_type: string;
  type?: string;
  manufacturer_id?: string;
  category_id?: string;
  name?: string;
};

export type ProductFilterType = 'invoice-exportable' | 'new' | 'use-vietnamese' | 'only-medofa';
