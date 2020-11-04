import { Category } from './Category';
import { ProductBadgeType } from './ProductBadgeType';

export type Product = {
  id: string;
  name: string;
  image: string;
  unit: string;
  category: Category;
  badges?: ProductBadgeType[];
  new?: boolean;
  discountPercent?: number;
  supplier?: string;
  oldPrice?: string;
  price: string;
  deal?: boolean;
  expirationDate?: string;
};
