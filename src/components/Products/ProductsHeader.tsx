import { useRouter } from 'next/router'
import React from 'react'
import { productsPageSize } from '.'

type Props = {
  totalProducts: number
}

const Header = (props: Props) => {
  const { totalProducts } = props

  const router = useRouter()

  const currentPage = +(router.query.page as string) || 1

  const start = (currentPage - 1) * productsPageSize + 1

  const end = Math.min(start + productsPageSize - 1, totalProducts)

  return (
    <div className="px-2 px-sm-0">
      <div className="mb-2">
        <h1 className="products__header text-capitalize mb-3">Tất cả sản phẩm</h1>

        {totalProducts > 0 ? (
          <>
            Hiển thị{' '}
            <b>
              {start}&nbsp;-&nbsp;{end}
            </b>{' '}
            trên tổng số <b>{totalProducts}</b> Sản Phẩm
          </>
        ) : (
          'Không có Sản Phẩm'
        )}
      </div>
    </div>
  )
}

export default Header
