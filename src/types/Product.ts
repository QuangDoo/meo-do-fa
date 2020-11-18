export type Product = {
  id: string;
  name: string;
  price: number;
  standard_price: number;
  image_128: string;
  image_256: string;
  image_512: string;
  uom_name: string;
  is_new?: boolean;
  is_quick_invoice?: boolean;
  is_vn?: boolean;
  is_exclusive?: boolean;
  categories: {
    id: string;
    name: string;
  }[];
  manufacturer: {
    id: string;
    short_name: string;
  };
};
