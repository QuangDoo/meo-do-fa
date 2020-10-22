import { useRouter } from 'next/router'
import React from 'react'
import { productsPageSize } from '..'

interface Props {
  total: number
}

export const PaginateStatus = ({ total }: Props) => {
  const router = useRouter()

  const currentPage = +(router.query.page as string) || 1

  const start = (currentPage - 1) * productsPageSize + 1

  const end = Math.min(start + productsPageSize - 1, total)

  return (
    <div className="mb-2">
      Hiển thị{' '}
      <b>
        {start}&nbsp;-&nbsp;{end}
      </b>{' '}
      trên tổng số <b>{total}</b> Sản Phẩm
    </div>
  )
}
