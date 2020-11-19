import React, { forwardRef } from 'react';

import RadioInput from '../../../Form/Radio';
import InputCard from '../InputCard';
import FastDeliveryLabel from './FastDeliveryLabel';
import FastDeliveryRules from './FastDeliveryRules';

const DeliveryOption = (props, ref): JSX.Element => {
  return (
    <InputCard title="Hình thức giao hàng">
      <RadioInput
        name="deliveryOption"
        ref={ref({
          required: 'Xin chọn hình thức giao hàng.'
        })}
        options={[
          {
            label: 'Giao hàng tiêu chuẩn',
            value: props.deliveryMethods[0].id
          },
          {
            label: <FastDeliveryLabel />,
            value: 0,
            children: <FastDeliveryRules />,
            disabled: true // Disable fast delivery or not
          }
        ]}
      />
    </InputCard>
  );
};

export default forwardRef(DeliveryOption);
