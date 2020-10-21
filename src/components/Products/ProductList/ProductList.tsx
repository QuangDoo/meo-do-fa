import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ProductCard, { Product } from '../../ProductCard'

const productListProduct: Product = {
  new: true,
  name: 'egudin solifenacin succinat 5mg medisun (h/30v)',
  imageId: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  price: '430.500',
  productId: 'egudin-solifenacin-succinat-5mg-medisun-h-30v',
  unit: 'Hộp 3 vỉ x 10 viên',
  category: 'thận, tiết niệu',
  categoryId: 'than-tiet-nieu',
  badges: ['common', 'invoice_exportable', 'change_style', 'flash_sale'],
}

export const productListProducts: Product[] = [...new Array(10)].map(() => ({
  ...productListProduct,
}))

const ProductList = () => {
  const router = useRouter()

  useEffect(() => {
    console.log('Products query:', router.query)
  }, [router.query])

  return (
    <div className="products__cards mb-3">
      {productListProducts.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  )
}

export default ProductList
