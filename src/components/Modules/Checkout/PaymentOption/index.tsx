import React, { forwardRef, useEffect, useState } from 'react';
import Radio from 'src/components/Form/Radio';

import InputCard from '../InputCard';
import TransferPaymentInfo from './TransferPaymentInfo';
import TransferPaymentLabel from './TransferPaymentLabel';

const PaymentOption = (props, ref): JSX.Element => {
  const [paymentMethodsState, setPaymentMethodsState] = useState([]);
  useEffect(() => {
    if (props.paymentMethods) {
      setPaymentMethodsState(props.paymentMethods);
    }
  }, [props]);

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
            value: paymentMethodsState[1]?.id
          },
          {
            label: <TransferPaymentLabel />,
            value: paymentMethodsState[0]?.id,
            children: <TransferPaymentInfo {...paymentMethodsState[0]} />
            // children: <TransferPaymentInfo />
          }
        ]}
      />
    </InputCard>
  );
};

export default forwardRef(PaymentOption);
