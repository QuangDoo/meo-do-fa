import { Product } from '../types/Product';

const mockProduct: Product = {
  id: 'phan-trang-johnson-s-baby-powder-c-500g',
  name: "Phấn Trắng Johnson's Baby Powder (C/500g)",
  image_128: 'ZL8RabUavQqaTzX8TyGwe41V',
  image_256: 'ZL8RabUavQqaTzX8TyGwe41V',
  image_512: 'ZL8RabUavQqaTzX8TyGwe41V',
  uom_name: 'Chai 500gr',
  list_price: 72226,
  standard_price: 73700,
  badges: ['promotion', 'invoice_exportable'],
  category_ids: ['duoc-my-pham'],
  seller_ids: [],
  create_date: 1602131598549
};

export const mockDealsProducts: Product[] = [...Array(25)].map(() => ({ ...mockProduct }));
