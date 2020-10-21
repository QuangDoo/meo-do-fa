import React from 'react'
import { exampleProducts } from '../Products/Products'
import { ProductsCarousel } from '../ProductsCarousel'
import { ProductsContainer } from './ProductsContainer'

export const NewProducts = (props) => {
  return (
    <ProductsContainer title="Sản phẩm mới" seeMoreUrl="#">
      <ProductsCarousel products={exampleProducts} />
    </ProductsContainer>
  )
}
