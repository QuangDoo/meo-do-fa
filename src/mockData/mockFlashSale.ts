import { Product } from '../types/Product';

const mockProduct: Product = {
  new: true,
  image: 'gV7ACwEuH8vkfEJVV8tMbix3',
  price: '783.200',
  id:
    'combo-eucerin-tri-mun-kem-kiem-soat-dau-giam-mun-pro-acne-a-i-matt-fluid-50ml-tinh-chat-tri-mun-viem-proacne-ai-clearing-treatment-40ml-tang-nuoc-tay-trang-200ml',
  category: {
    name: 'dược mỹ phẩm',
    id: 'duoc-my-pham',
    slug: 'duoc-my-pham'
  },
  unit: 'Combo',
  name:
    'combo eucerin trị mụn (kem kiểm soát dầu giảm mụn pro acne a.i matt fluid 50ml+ tinh chất trị mụn viêm proacne ai clearing treatment 40ml) tặng nước tẩy trang 200ml',
  badges: ['invoice_exportable', 'only_thuocsi', 'flash_sale']
};

export const mockFlashSale = [...new Array(10)].map(() => ({ ...mockProduct }));