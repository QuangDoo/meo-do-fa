import clsx from 'clsx';
import { Trans, useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
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
    <InputCard title={t('checkout:payment_option')}>
      <Radio
        name="paymentOption"
        ref={register({
          required: 'Xin chọn hình thức thanh toán.'
        })}
        options={[
          {
            label: t('checkout:cash_on_delivery'),
            value: cashOnDelivery.id
          },
          {
            label: (
              <Trans
                i18nKey="checkout:bank_transfer"
                components={{
                  // Link: <Link href="/transfer-instructions"></Link>
                  // a: <a></a>
                  Link: <a href="/transfer-instructions"> </a>
                }}
              />
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
                        <div className="bank-info__label">
                          {t(`checkout:bank_transfer__${key}`)}
                        </div>
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
