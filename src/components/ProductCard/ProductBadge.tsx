import React from 'react'

export type BadgeType =
  | 'invoice_exportable'
  | 'out_of_stocks'
  | 'only_thuocsi'
  | 'promotion'
  | 'flash_sale'
  | 'common'
  | 'change_style'
  | 'close_date'
  | 'use_vietnamese'

type ProductBadgeProps = {
  type: BadgeType
  expirationDate?: string
}

const badgeName = {
  invoice_exportable: ' Hóa đơn nhanh',
  out_of_stocks: ' Tạm hết hàng',
  only_thuocsi: ' Chỉ có tại thuocsi',
  promotion: ' Khuyến mãi',
  flash_sale: ' Flash Sale',
  common: ' Bán chạy',
  change_style: ' Đổi mẫu',
  use_vietnamese: ' Người Việt dùng hàng Việt',
}

export const ProductBadge = (props: ProductBadgeProps) => {
  if (props.type === 'promotion') return <span className="badge badge-danger mr-2">Khuyến mãi</span>

  return (
    <span className={`badge badge-light display-status mr-1 mb-1 ${props.type}`}>
      <i className="fas mr-1"></i>
      {props.type === 'flash_sale' ? (
        <>
          <i className="fas fa-bolt text-secondary mr-1"></i>Flash Sale
          <i className="fas fa-bolt text-secondary ml-1"></i>
        </>
      ) : props.type === 'close_date' ? (
        `Cận date: ${props.expirationDate}`
      ) : (
        badgeName[props.type]
      )}
    </span>
  )
}
