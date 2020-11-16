import { Category } from './Category';
import { Manufacturer } from './Manufacturer';
import { ProductBadgeType } from './ProductBadgeType';

export type Product = {
  id: string;
  name: string;
  image_128: string;
  image_256: string;
  image_512: string;
  uom_name: string; // units
  category_ids: string[]; // categories
  create_date: number; // milliseconds since Unix Epoch
  list_price: number; // current price (can be different from standard price if it's a deal or promotion)
  price: number;
  seller_ids: string[]; // suppliers
  standard_price: number; // standard price
  badges: ProductBadgeType[];
  expirationDate?: string;
};
