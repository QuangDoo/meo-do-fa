import React from 'react'

const FilterTags = () => {
  return (
    <div className="d-none d-sm-block">
      <div className="d-flex justify-content-between flex-wrap align-items-end mb-4">
        <div className="products__filter-btns">
          <a className="btn products__filter-btn" href="https://thuocsi.vn/products">
            Tất cả
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=flash_sale"
          >
            <i className="fas fa-bolt text-secondary mr-1" />
            Flash Sale
            <i className="fas fa-bolt text-secondary ml-1" />
          </a>
          <a
            className="btn products__filter-btn active"
            href="https://thuocsi.vn/products?current_tab=new_arrival"
          >
            SP Mới
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=decreasing_price"
          >
            Giảm giá
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=invoice_exportable"
          >
            Hóa đơn nhanh
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=increasing_price"
          >
            Tăng giá
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=close_date"
          >
            Cận date
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=only_thuocsi"
          >
            Chỉ có tại thuocsi
          </a>
          <a
            className="btn products__filter-btn"
            href="https://thuocsi.vn/products?current_tab=use_vietnamese"
          >
            Người Việt dùng hàng Việt
          </a>
        </div>
      </div>
    </div>
  )
}

export default FilterTags
