import React, { forwardRef } from 'react'
import InputCard from './InputCard'
import RadioInput from './RadioInput'
import TransferPaymentInfo from './TransferPaymentInfo'
import TransferPaymentLabel from './TransferPaymentLabel'

const PaymentOption = (props, ref) => {
  return (
    <InputCard title="Hình thức thanh toán">
      <RadioInput
        name="deliveryOption"
        ref={ref({
          required: 'Xin chọn hình thức thanh toán.',
        })}
        options={[
          {
            label: 'Thanh toán tiền mặt khi nhận hàng',
            value: 'cod',
          },
          {
            label: <TransferPaymentLabel />,
            value: 'bank_transfer',
            children: <TransferPaymentInfo />,
          },
        ]}
      />
    </InputCard>
  )
}

export default forwardRef(PaymentOption)
