import clsx from 'clsx'
import React from 'react'
import DescriptionBox from '../DescriptionBox'

type Line = {
  label: string
  content: string
}

const lines: Line[] = [
  {
    label: 'Chủ tài khoản',
    content: 'Công Ty TNHH BuyMed',
  },
  {
    label: 'Số tài khoản',
    content: '1913 45430 30020',
  },
  {
    label: 'Ngân hàng',
    content: 'Ngân hàng Techcombank - Chi nhánh Bắc Hải',
  },
  {
    label: 'Nội dung',
    content: 'Mã đơn hàng - Tên nhà thuốc',
  },
]

const TransferPaymentInfo = () => {
  return (
    <>
      <br />

      <small className="text-muted">Giảm 0.5% cho đơn hàng chuyển khoản trước.</small>

      <DescriptionBox>
        <div className="bank-info">
          {lines.map((line, index) => (
            <div key={index} className={clsx('d-flex', index < lines.length - 1 && 'mb-2')}>
              <div className="bank-info__label">{line.label}</div>
              <div className="bank-info__content">{line.content}</div>
            </div>
          ))}
        </div>
      </DescriptionBox>
    </>
  )
}

export default TransferPaymentInfo
