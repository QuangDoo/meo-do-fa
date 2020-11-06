import { Product } from '../types/Product';

const mockProduct: Product = {
  new: true,
  name: 'egudin solifenacin succinat 5mg medisun (h/30v)',
  image: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  price: '430.500',
  id: 'egudin-solifenacin-succinat-5mg-medisun-h-30v',
  unit: 'Hộp 3 vỉ x 10 viên',
  categories: [
    {
      name: 'thận, tiết niệu',
      id: 'than-tiet-nieu'
    }
  ],
  badges: ['common', 'invoice_exportable', 'change_style', 'flash_sale']
};

export const mockProducts: Product[] = [...new Array(20)].map(() => ({
  ...mockProduct
}));
