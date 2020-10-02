import React from 'react'

interface PaginateStatusProps {
  start: number
  end: number
  total: number
}

export const PaginateStatus: React.FC<PaginateStatusProps> = (props) => {
  const { start, end, total } = props
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
