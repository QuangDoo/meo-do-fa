import React from 'react'
import { productListProducts } from '../../Products/ProductList/ProductList'
import { ProductsCarousel } from '../../ProductsCarousel'
import { ProductsContainer } from '../ProductsContainer'

export const BestSelling = () => {
  return (
    <ProductsContainer title="Sản phẩm bán chạy" seeMoreUrl="#">
      <ProductsCarousel products={productListProducts} />
    </ProductsContainer>
  )
}
