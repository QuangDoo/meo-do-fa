import React from 'react';
import RadioInput from 'src/components/Form/Radio';
import { DeliveryMethod } from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import InputCard from '../InputCard';

type Props = ReactHookFormRegister & {
  deliveryMethods: DeliveryMethod[];
};

const DeliveryOption = (props: Props) => {
  const { deliveryMethods, register } = props;

  if (!deliveryMethods.length) return null;

  return (
    <InputCard title="Hình thức giao hàng">
      <RadioInput
        name="deliveryOption"
        ref={register({
          required: 'Xin chọn hình thức giao hàng.'
        })}
        options={deliveryMethods.map((method) => ({
          label: method.name,
          value: method.id
        }))}
      />
    </InputCard>
  );
};

export default DeliveryOption;
