import { ProductBadgeType } from './ProductBadgeType';

export type Product = {
  name: string;
  list_price: string;
  unit: string;
  categ_id: string[];
  categoryId: string;
  image_128: string;
  id: string;

  badges?: ProductBadgeType[];
  new?: boolean;
  discountPercent?: number;
  supplier?: string;
  oldPrice?: string;
  deal?: boolean;
  expirationDate?: string;
};
