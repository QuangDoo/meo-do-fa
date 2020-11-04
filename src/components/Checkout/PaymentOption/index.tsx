import React, { forwardRef } from 'react';

import Radio from '../../Form/Radio';
import InputCard from '../InputCard';
import TransferPaymentInfo from './TransferPaymentInfo';
import TransferPaymentLabel from './TransferPaymentLabel';

const PaymentOption = (props, ref): JSX.Element => {
  return (
    <InputCard title="Hình thức thanh toán">
      <Radio
        name="paymentOption"
        ref={ref({
          required: 'Xin chọn hình thức thanh toán.'
        })}
        options={[
          {
            label: 'Thanh toán tiền mặt khi nhận hàng',
            value: 'cod'
          },
          {
            label: <TransferPaymentLabel />,
            value: 'bank_transfer',
            children: <TransferPaymentInfo />
          }
        ]}
      />
    </InputCard>
  );
};

export default forwardRef(PaymentOption);
