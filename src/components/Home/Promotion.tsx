import React from 'react'
import { productListProducts } from '../Products/ProductList/ProductList'
import ProductCard from '../ProductCard'
import { ProductsContainer } from './ProductsContainer'

export const Promotion = () => {
  return (
    <ProductsContainer title="Khuyến mãi" seeMoreUrl="#" deals className="px-0 px-sm-3">
      <div className="products__cards">
        {productListProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </ProductsContainer>
  )
}
