import React from 'react'
import { exampleProducts } from '../Products'
import { ProductsCarousel } from '../ProductsCarousel'
import { ProductsContainer } from './ProductsContainer'

export const BestSelling = () => {
  return (
    <ProductsContainer title="Sản phẩm bán chạy" seeMoreUrl="#">
      <ProductsCarousel products={exampleProducts} />
    </ProductsContainer>
  )
}
