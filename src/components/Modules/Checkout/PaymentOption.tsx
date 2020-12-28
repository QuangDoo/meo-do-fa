import clsx from 'clsx';
import { Trans, useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import LinkText from 'src/components/Form/LinkText';
import Radio from 'src/components/Form/Radio';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_PAYMENT, ApplyPaymentData, ApplyPaymentVars } from 'src/graphql/order/applyPayment';
import { OutputCounsel } from 'src/graphql/order/getCounsel';
import { PaymentMethod } from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import DescriptionBox from './DescriptionBox';
import InputCard from './InputCard';

type Props = {
  paymentMethods: PaymentMethod[];
  setCounselData: (value: React.SetStateAction<OutputCounsel>) => void;
  orderNo: string;
} & ReactHookFormRegister;

const PaymentOption = (props: Props): JSX.Element => {
  const { paymentMethods, register } = props;

  const { t } = useTranslation('checkout');

  const router = useRouter();

  const [applyPayment, { loading: applyingPayment }] = useMutationAuth<
    ApplyPaymentData,
    ApplyPaymentVars
  >(APPLY_PAYMENT, {
    onCompleted: (data) => {
      props.setCounselData(data.applyPayment);
    },
    onError: (err) => {
      const errorCode = err.graphQLErrors[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    }
  });

  if (!paymentMethods.length) return null;

  const cashOnDelivery = paymentMethods[0];
  const bankTransfer = paymentMethods[1];

  const handleChange = (e) => {
    applyPayment({
      variables: {
        orderNo: props.orderNo,
        payment_method: +e.target.value
      }
    });
  };

  return (
    <InputCard title={t('checkout:paymentOption_title')}>
      <LoadingBackdrop open={applyingPayment} />

      <Radio
        onChange={handleChange}
        name="paymentMethodId"
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
              <Trans
                i18nKey="checkout:paymentOption_bank"
                components={{
                  Link: <LinkText href="/help/huong-dan-chuyen-khoan"> </LinkText>
                }}
              />
            ),
            value: bankTransfer.id,
            children: (
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
            )
          }
        ]}
      />
    </InputCard>
  );
};

export default PaymentOption;
