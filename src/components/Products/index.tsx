import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import SideBar from './SideBar'
import ProductsHeader from './ProductsHeader'
import FilterTags from './FilterTags'
import Pagination from './Pagination'
import ProductList from './ProductList'
import { Product } from '../ProductCard'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../../graphql/product/product.query'

const productListProduct: Product = {
  new: true,
  name: 'egudin solifenacin succinat 5mg medisun (h/30v)',
  image: 'Lg9NokKW5SY2TGdtiEKFCNeR',
  price: '430.500',
  id: 'egudin-solifenacin-succinat-5mg-medisun-h-30v',
  unit: 'Hộp 3 vỉ x 10 viên',
  category: 'thận, tiết niệu',
  categoryId: 'than-tiet-nieu',
  badges: ['common', 'invoice_exportable', 'change_style', 'flash_sale'],
}

export const exampleProducts: Product[] = [...new Array(10)].map(() => ({
  ...productListProduct,
}))

export const productsPageSize = 20

// const exampleTotalProducts = 311

const Products = () => {
  const router = useRouter()

  // TODO: Integration
  const [products, setProducts] = useState<Product[]>([])

  // TODO: Integration
  const [totalProducts, setTotalProducts] = useState<number>(0)

  const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS)

  // Loading products
  useEffect(() => {
    console.log('Loading products:', loading)
  }, [loading])

  // Update products state when data arrives
  useEffect(() => {
    if (!data) return

    console.log('Products data:', data.getProducts)

    setProducts(data.getProducts)
    setTotalProducts(data.getProducts.length)
  }, [data])

  useEffect(() => {
    console.log('Products query:', router.query)

    // Get products again when query changes
    getProducts({
      variables: {
        page: +(router.query.page as string) || 1,
        pageSize: productsPageSize,
      },
    })
  }, [router.query])

  return (
    <div className="products container-fluid mobile-content my-3 my-sm-5">
      <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
        <div className="products__sidebar pr-4 d-none d-sm-block">
          <SideBar />
        </div>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <ProductsHeader totalProducts={totalProducts} />

          <FilterTags />

          {products.length > 0 && (
            <Col>
              <Pagination totalProducts={totalProducts} />

              <ProductList products={products} />

              <Pagination totalProducts={totalProducts} />
            </Col>
          )}
        </Col>
      </div>
    </div>
  )
}

export default Products
