/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import React from 'react'

type Props = {
  name: string
}

const Agreement = ({ name }: Props, ref) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        name={name}
        id="checkout-agreement"
        className="custom-control-input"
        ref={ref}
      />

      <label htmlFor="checkout-agreement" className="custom-control-label">
        Tôi đồng ý với{' '}
        <Link href="#">
          <a>Điều khoản sử dụng</a>
        </Link>
      </label>

      <div className="checkout__description checkout__description--white mt-2">
        <ol className="pl-4 mb-0">
          <li>Thuocsi có thể hủy đơn hàng của bạn nếu chênh lệch hơn 5% giá trị sản phẩm.</li>

          <li>
            Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy thuộc vào nhà
            cung cấp.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default React.forwardRef(Agreement)
