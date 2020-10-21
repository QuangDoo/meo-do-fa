import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import { SideBar } from './SideBar'
import { Header } from './Header'
import { PaginateStatus } from './Pagination/PaginateStatus'
import { FilterTags } from './FilterTags'
import { Pagination } from './Pagination'
import { ProductList } from './ProductList'
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

const Products = () => {
  const [products, setProducts] = useState(exampleProducts)

  const [headerName, setHeaderName] = useState('Tất cả sản phẩm')

  const router = useRouter()

  useEffect(() => {
    console.log('Products query:', router.query)

    // Get products again based on query
  }, [router.query])

  console.log('Rendered')

  return (
    <StyledProductsWrap>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <Header name={headerName} />
          <PaginateStatus start={1} end={20} total={100} />
          <FilterTags />
          <Pagination />
          <ProductList products={products} />
          <Pagination />
        </Col>
      </Row>
    </StyledProductsWrap>
  )
}

export default Products
