import React, { forwardRef } from 'react'
import InputCard from '../InputCard'
import RadioInput from '../../Radio'
import FastDeliveryLabel from './FastDeliveryLabel'
import FastDeliveryRules from './FastDeliveryRules'

const DeliveryOption = (props, ref) => {
  return (
    <InputCard title="Hình thức giao hàng">
      <RadioInput
        name="deliveryOption"
        ref={ref({
          required: 'Xin chọn hình thức giao hàng.',
        })}
        options={[
          {
            label: 'Giao hàng tiêu chuẩn',
            value: 'standard',
          },
          {
            label: <FastDeliveryLabel />,
            value: 'fast',
            children: <FastDeliveryRules />,
            disabled: true, // Disable fast delivery or not
          },
        ]}
      />
    </InputCard>
  )
}

export default forwardRef(DeliveryOption)
