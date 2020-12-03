import { useTranslation } from 'i18n';
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

  const { t } = useTranslation('checkout');

  if (!deliveryMethods.length) return null;

  return (
    <InputCard title={t('checkout:deliveryOption_title')}>
      <RadioInput
        name="deliveryOption"
        ref={register({
          required: t('checkout:deliveryOption_required') + ''
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
