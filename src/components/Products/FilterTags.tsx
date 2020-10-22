import React from 'react'
import FilterTag from './FilterTag'

type FilterTagType = {
  children: React.ReactNode
  tab?: string
}

const FlashSaleContent = (
  <>
    <i className="fas fa-bolt text-secondary mr-1" />
    Flash Sale
    <i className="fas fa-bolt text-secondary ml-1" />
  </>
)

const filterTags: FilterTagType[] = [
  { children: 'Tất cả' },
  { children: FlashSaleContent, tab: 'flash_sale' },
  { children: 'SP Mới', tab: 'new_arrival' },
  { children: 'Giảm giá', tab: 'decreasing_price' },
  { children: 'Hóa đơn nhanh', tab: 'invoice_exportable' },
  { children: 'Tăng giá', tab: 'increasing_price' },
  { children: 'Cận date', tab: 'close_date' },
  { children: 'Chỉ có tại thuocsi', tab: 'only_thuocsi' },
  { children: 'Người Việt dùng hàng Việt', tab: 'use_vietnamese' },
]

const FilterTags = () => {
  return (
    <div className="d-none d-sm-block">
      <div className="d-flex justify-content-between flex-wrap align-items-end mb-4">
        <div className="products__filter-btns">
          {filterTags.map(({ tab, children }, index) => (
            <FilterTag key={index} tab={tab}>
              {children}
            </FilterTag>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterTags
