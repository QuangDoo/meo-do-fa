import React from 'react'
import { productListProducts } from '../Products/ProductList/ProductList'
import { ProductsCarousel } from '../ProductsCarousel'
import { ProductsContainer } from './ProductsContainer'

export const NewProducts = (props) => {
  return (
    <ProductsContainer title="Sản phẩm mới" seeMoreUrl="#">
      <ProductsCarousel products={productListProducts} />
    </ProductsContainer>
  )
}
