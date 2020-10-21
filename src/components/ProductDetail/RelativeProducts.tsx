import React from 'react'
import { ProductsContainer } from '../Home/ProductsContainer'
import { productListProducts } from '../Products/ProductList/ProductList'
import { ProductsCarousel } from '../ProductsCarousel'

const RelativeProducts = () => {
    return (
        <ProductsContainer title="Có thể bạn muốn mua " seeMoreUrl="#">
            <ProductsCarousel products={productListProducts} />
        </ProductsContainer>
    )
}

export default RelativeProducts
