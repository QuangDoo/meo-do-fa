import { Product } from '../types/Product';

const mockProduct: Product = {
  id:
    'combo-eucerin-tri-mun-kem-kiem-soat-dau-giam-mun-pro-acne-a-i-matt-fluid-50ml-tinh-chat-tri-mun-viem-proacne-ai-clearing-treatment-40ml-tang-nuoc-tay-trang-200ml',
  name:
    'combo eucerin trị mụn (kem kiểm soát dầu giảm mụn pro acne a.i matt fluid 50ml+ tinh chất trị mụn viêm proacne ai clearing treatment 40ml) tặng nước tẩy trang 200ml',
  image_128: 'gV7ACwEuH8vkfEJVV8tMbix3',
  image_256: 'gV7ACwEuH8vkfEJVV8tMbix3',
  image_512: 'gV7ACwEuH8vkfEJVV8tMbix3',
  list_price: 783200,
  standard_price: 783200,
  categ_id: ['duoc-my-pham'],
  seller_ids: [],
  uom_name: 'Combo',
  badges: ['invoice_exportable', 'only_thuocsi', 'flash_sale'],
  create_date: 1602131598549,
  price: 10
};

export const mockFlashSale = [...new Array(10)].map(() => ({ ...mockProduct }));
