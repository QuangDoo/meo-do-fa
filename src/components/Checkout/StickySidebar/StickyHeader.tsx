import Link from 'next/link'
import React from 'react'
import Button from '../../Button'

const StickyHeader = () => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <h4 className="d-flex flex-wrap align-items-center">
        Đơn Hàng
        <small className="ml-1">(21 sản phẩm)</small>
      </h4>

      <div>
        <Link href="/cart" passHref>
          <Button size="sm" variant="primary">
            Sửa
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default StickyHeader
