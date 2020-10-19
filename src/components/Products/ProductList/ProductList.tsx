import React from 'react'
import ProductCard, { Product } from '../../ProductCard'

const productListProduct: Product = {
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

export const productListProducts: Product[] = [...new Array(10)].map(() => ({
  ...productListProduct,
}))

const ProductList = () => {
  return (
    <div className="products__cards mb-3">
      {productListProducts.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  )
}

export default ProductList
