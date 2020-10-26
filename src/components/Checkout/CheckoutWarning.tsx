import React from 'react'

const CheckoutWarning = () => {
  return (
    <div className="checkout__description checkout__description--white mt-2">
      <ol className="pl-4 mb-0">
        <li>Thuocsi có thể hủy đơn hàng của bạn nếu chênh lệch hơn 5% giá trị sản phẩm.</li>

        <li>
          Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy thuộc vào nhà
          cung cấp.
        </li>
      </ol>
    </div>
  )
}

export default CheckoutWarning
