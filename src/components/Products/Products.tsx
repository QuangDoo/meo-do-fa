import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

import { SideBar } from './SideBar'
import { Header } from './Header'
import { PaginateStatus } from './Pagination/PaginateStatus'
import { FilterTags } from './FilterTags'
import { Pagination } from './Pagination'
import { ProductList } from './ProductList'

const StyledProductsWrap = styled.div`
  padding: 3rem;
`

const Products = () => {
  return (
    <StyledProductsWrap>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20} style={{ paddingLeft: '1.5rem' }}>
          <Header name="Tất cả sản phẩm" />
          <PaginateStatus start={1} end={20} total={100} />
          <FilterTags />
          <Pagination />
          <ProductList />
          <Pagination />
        </Col>
      </Row>
    </StyledProductsWrap>
  )
}

export default Products
