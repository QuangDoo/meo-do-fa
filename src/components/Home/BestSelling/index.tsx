import React from 'react'
import { productExample } from '../../Products/ProductList/ProductList'
import { ProductsCarousel } from '../../ProductsCarousel'

const products = [...new Array(10)].map(() => ({ ...productExample }))

export const BestSelling = (props) => {
  return (
    <section className="py-5 container-fluid">
      <div className="home__container">
        <div className="text-center mb-4">
          <h2>Sản phẩm bán chạy</h2>
        </div>

        <div className="mb-4">
          <ProductsCarousel products={products} />
        </div>
      </div>
    </section>
  )
}
