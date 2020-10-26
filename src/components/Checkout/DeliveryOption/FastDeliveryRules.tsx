import clsx from 'clsx'
import React from 'react'
import DescriptionBox from '../DescriptionBox'

const rules = [
  <span key={0}>
    Cam kết giao hàng <b>trong 24 giờ</b>
  </span>,

  <span key={1}>
    Chỉ áp dụng cho đơn hàng <b>tại TP.HCM </b>, không áp dụng cho <b> huyện Củ Chi</b> và{' '}
    <b>huyện Cần Giờ</b>
  </span>,

  <span key={2}>
    Chỉ áp dụng cho giá trị đơn hàng <b>dưới 5 triệu đồng</b>
  </span>,

  <span key={3}>
    Không áp dụng giao hàng nhanh <b>ngày thứ bảy</b>, <b>chủ nhật</b> và các ngày <b>lễ tết</b>.
  </span>,
]

const FastDeliveryRules = () => {
  return (
    <DescriptionBox>
      {rules.map((rule, index) => (
        <p key={index} className={clsx(index < rules.length - 1 ? 'mb-2' : 'mb-0')}>
          <i className="fa fa-info-circle text-info mr-2"></i>
          {rule}
        </p>
      ))}
    </DescriptionBox>
  )
}

export default FastDeliveryRules
