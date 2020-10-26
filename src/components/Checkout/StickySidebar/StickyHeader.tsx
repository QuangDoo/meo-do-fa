import Link from 'next/link'
import React from 'react'

const StickyHeader = () => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <h4 className="d-flex flex-wrap align-items-center">
        Đơn Hàng
        <small className="ml-1">(21 sản phẩm)</small>
      </h4>

      <div>
        <Link href="/cart">
          <a className="btn btn-primary btn-sm">Sửa</a>
        </Link>
      </div>
    </div>
  )
}

export default StickyHeader
