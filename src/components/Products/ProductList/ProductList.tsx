import React from 'react'
import ProductCard, { Product } from '../../Shared/ProductCard'

export const productExample: Product = {
  new: true,
  name: 'egudin solifenacin succinat 5mg medisun (h/30v)',
  imageUrl: 'https://images.thuocsi.vn/Lg9NokKW5SY2TGdtiEKFCNeR',
  price: '430.500',
  productUrl: 'https://thuocsi.vn/products/egudin-solifenacin-succinat-5mg-medisun-h-30v',
  unit: 'Hộp 3 vỉ x 10 viên',
  category: 'thận, tiết niệu',
  categoryUrl: 'https://thuocsi.vn/categories/than-tiet-nieu',
  badges: ['common', 'invoice_exportable', 'change_style', 'flash_sale'],
}

const ProductList = () => {
  return (
    <div className="products__cards mb-3">
      <ProductCard {...productExample} />
      <ProductCard {...productExample} />
      <ProductCard {...productExample} />
      <ProductCard {...productExample} />
      <ProductCard {...productExample} />
      <ProductCard {...productExample} />
    </div>
  )
}

export default ProductList
