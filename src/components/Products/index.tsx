import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import SideBar from './SideBar'
import ProductsHeader from './ProductsHeader'
import { PaginateStatus } from './Pagination/PaginateStatus'
import FilterTags from './FilterTags'
import Pagination from './Pagination'
import ProductList from './ProductList'
import { Product } from '../ProductCard'
import { useRouter } from 'next/router'

const StyledProductsWrap = styled.div`
  padding: 3rem;
`

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

export const exampleProducts: Product[] = [...new Array(10)].map(() => ({
  ...productListProduct,
}))

export const productsPageSize = 20

const exampleTotalProducts = 311

const Products = () => {
  const router = useRouter()

  // TODO: Integration
  const [products, setProducts] = useState<Product[]>([])

  // TODO: Integration
  const [totalProducts, setTotalProducts] = useState<number>(0)

  useEffect(() => {
    console.log('Products query changed:', router.query)

    // Get products again when query changes
    // TODO: Integration
    setTotalProducts(exampleTotalProducts)
    setProducts(exampleProducts)
  }, [router.query])

  return (
    <StyledProductsWrap>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <ProductsHeader />

          <PaginateStatus total={totalProducts} />

          <FilterTags />

          <Pagination totalProducts={exampleTotalProducts} />

          <ProductList products={products} />

          <Pagination totalProducts={exampleTotalProducts} />
        </Col>
      </Row>
    </StyledProductsWrap>
  )
}

export default Products
