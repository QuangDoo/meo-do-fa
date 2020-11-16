import { Product } from '../types/Product';

const mockProduct: Product = {
  id: 'egudin-solifenacin-succinat-5mg-medisun-h-30v',
  name: 'egudin solifenacin succinat 5mg medisun (h/30v)',
  image_128: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  image_256: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  image_512: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  list_price: 430500,
  standard_price: 430500,
  uom_name: 'Hộp 3 vỉ x 10 viên',
  categories: [
    {
      id: 'than-tiet-nieu',
      name: 'Thận tiết niệu'
    }
  ],
  manufacturer: {
    id: '1',
    short_name: 'Hasan'
  }
};

export const mockProducts: Product[] = [...new Array(20)].map(() => ({
  ...mockProduct
}));
