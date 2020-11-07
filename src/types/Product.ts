import { Category } from './Category';
import { ProductBadgeType } from './ProductBadgeType';
import { Supplier } from './Supplier';

export type Product = {
  id: string;
  name: string;
  image_128: string;
  image_256: string;
  image_512: string;
  uom_name: string; // units
  categ_id: string[]; // categories
  create_date: Date;
  list_price: number;
  seller_ids: string[]; // suppliers
  standard_price: number; // current price
  badges?: ProductBadgeType[];
  expirationDate?: string;
};
