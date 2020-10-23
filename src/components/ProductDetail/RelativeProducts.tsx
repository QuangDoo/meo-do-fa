import React from 'react'
import { ProductsContainer } from '../Home/ProductsContainer'
import { exampleProducts } from '../Products'
import { ProductsCarousel } from '../ProductsCarousel'

const RelativeProducts = () => {
  return (
    <ProductsContainer title="Có thể bạn muốn mua " seeMoreUrl="#">
      <ProductsCarousel products={exampleProducts} />
    </ProductsContainer>
  )
}

export default RelativeProducts
