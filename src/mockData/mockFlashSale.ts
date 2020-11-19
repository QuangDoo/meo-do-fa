import { Product } from '../types/Product';

const mockProduct: Product = {
  id:
    'combo-eucerin-tri-mun-kem-kiem-soat-dau-giam-mun-pro-acne-a-i-matt-fluid-50ml-tinh-chat-tri-mun-viem-proacne-ai-clearing-treatment-40ml-tang-nuoc-tay-trang-200ml',
  name:
    'combo eucerin trị mụn (kem kiểm soát dầu giảm mụn pro acne a.i matt fluid 50ml+ tinh chất trị mụn viêm proacne ai clearing treatment 40ml) tặng nước tẩy trang 200ml',
  image_128: 'gV7ACwEuH8vkfEJVV8tMbix3',
  image_256: 'gV7ACwEuH8vkfEJVV8tMbix3',
  image_512: 'gV7ACwEuH8vkfEJVV8tMbix3',
  price: 783200,
  standard_price: 783200,
  categories: [
    {
      id: 'duoc-my-pham',
      name: 'Dược Mỹ Phẩm'
    }
  ],
  uom_name: 'Combo',
  is_quick_invoice: true,
  is_exclusive: true,
  manufacturer: {
    id: '4',
    short_name: 'Hasan'
  }
};

export const mockFlashSale = [...new Array(10)].map(() => ({ ...mockProduct }));
