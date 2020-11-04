import { Product } from '../types/Product';

const mockProduct: Product = {
  id: 'phan-trang-johnson-s-baby-powder-c-500g',
  name: "Phấn Trắng Johnson's Baby Powder (C/500g)",
  image: 'ZL8RabUavQqaTzX8TyGwe41V',
  unit: 'Chai 500gr',
  price: '72.226',
  oldPrice: '73.700',
  badges: ['promotion', 'invoice_exportable'],
  categories: [
    {
      id: 'duoc-my-pham',
      name: 'Dược mỹ phẩm'
    }
  ],
  deal: true,
  discountPercent: 2
};

export const mockDealsProducts: Product[] = [...Array(25)].map(() => ({ ...mockProduct }));
