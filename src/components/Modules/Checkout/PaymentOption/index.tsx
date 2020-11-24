import React, { forwardRef } from 'react';
import Radio from 'src/components/Form/Radio';

import InputCard from '../InputCard';
import TransferPaymentInfo from './TransferPaymentInfo';
import TransferPaymentLabel from './TransferPaymentLabel';

const PaymentOption = (props, ref): JSX.Element => {
  if (props) return;
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
            value: props?.paymentMethods[1].id
          },
          {
            label: <TransferPaymentLabel />,
            value: props.paymentMethods[0].id,
            children: <TransferPaymentInfo {...props.paymentMethods[0]} />
            // children: <TransferPaymentInfo />
          }
        ]}
      />
    </InputCard>
  );
};

export default forwardRef(PaymentOption);
