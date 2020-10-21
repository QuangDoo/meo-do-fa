import React from 'react'
import FilterTag from './FilterTag'

const FilterTags = () => {
  return (
    <div className="d-none d-sm-block">
      <div className="d-flex justify-content-between flex-wrap align-items-end mb-4">
        <div className="products__filter-btns">
          {/* Default tab */}
          <FilterTag>Tất cả</FilterTag>

          <FilterTag tab="flash_sale">
            <i className="fas fa-bolt text-secondary mr-1" />
            Flash Sale
            <i className="fas fa-bolt text-secondary ml-1" />
          </FilterTag>

          <FilterTag tab="new_arrival">SP Mới</FilterTag>

          <FilterTag tab="decreasing_price">Giảm giá</FilterTag>

          <FilterTag tab="invoice_exportable">Hóa đơn nhanh</FilterTag>

          <FilterTag tab="icreasing_price">Tăng giá</FilterTag>

          <FilterTag tab="close_date">Cận date</FilterTag>

          <FilterTag tab="only_thuocsi">Chỉ có tại thuocsi</FilterTag>

          <FilterTag tab="use_vietnamese">Chỉ có tại thuocsi</FilterTag>
        </div>
      </div>
    </div>
  )
}

export default FilterTags
