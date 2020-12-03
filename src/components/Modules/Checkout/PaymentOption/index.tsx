import clsx from 'clsx';
import { Trans, useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import LinkText from 'src/components/Form/LinkText';
import Radio from 'src/components/Form/Radio';
import { PaymentMethod } from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import DescriptionBox from '../DescriptionBox';
import InputCard from '../InputCard';

type Props = {
  paymentMethods: PaymentMethod[];
} & ReactHookFormRegister;

const PaymentOption = (props: Props): JSX.Element => {
  const { paymentMethods, register } = props;

  const { t } = useTranslation('checkout');

  if (!paymentMethods.length) return null;

  const cashOnDelivery = paymentMethods[1];
  const bankTransfer = paymentMethods[0];

  return (
    <InputCard title={t('checkout:paymentOption_title')}>
      <Radio
        name="paymentOption"
        ref={register({
          required: t('checkout:paymentOption_required') + ''
        })}
        options={[
          {
            label: t('checkout:paymentOption_COD'),
            value: cashOnDelivery.id
          },
          {
            label: (
              <div>
                <Trans
                  i18nKey="checkout:paymentOption_bank"
                  components={{
                    Link: <LinkText href="/transfer-instructions"> </LinkText>
                  }}
                />
              </div>
            ),
            value: bankTransfer.id,
            children: (
              <>
                <br />
                {/* <small className="text-muted">Giảm 0.5% cho đơn hàng chuyển khoản trước.</small> */}
                <DescriptionBox>
                  <div className="bank-info">
                    {['account_name', 'account_no', 'bank_name', 'note'].map((key, index, arr) => (
                      <div key={key} className={clsx('d-flex', index < arr.length - 1 && 'mb-2')}>
                        <div className="bank-info__label">{t(`checkout:bank_info__${key}`)}</div>
                        <div className="bank-info__content">{bankTransfer[key]}</div>
                      </div>
                    ))}
                  </div>
                </DescriptionBox>
              </>
            )
          }
        ]}
      />
    </InputCard>
  );
};

export default PaymentOption;
