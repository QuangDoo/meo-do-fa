import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { Trans, useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import LinkText from 'src/components/Form/LinkText';
import Radio from 'src/components/Form/Radio';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_PAYMENT, ApplyPaymentData, ApplyPaymentVars } from 'src/graphql/order/applyPayment';
import { OutputCounsel } from 'src/graphql/order/getCounsel';
import {
  GET_PAYMENT_DELIVERY,
  GetPaymentAndDeliveryData
} from 'src/graphql/paymentAndDelivery/paymentAndDelivery,query';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import DescriptionBox from './DescriptionBox';
import InputCard from './InputCard';

type Props = {
  setCounselData: (value: React.SetStateAction<OutputCounsel>) => void;
  orderNo: string;
};

const PaymentOption = (props: Props): JSX.Element => {
  const { register } = useFormContext();

  const { t } = useTranslation('checkout');

  const router = useRouter();

  // Payment & Delivery options
  const { data: paymentAndDeliveryData } = useQuery<GetPaymentAndDeliveryData, undefined>(
    GET_PAYMENT_DELIVERY,
    {
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const paymentMethods = paymentAndDeliveryData?.getPaymentAndDeliveryMethod.paymentMethods || [];
  const cashOnDelivery = paymentMethods[0];
  const bankTransfer = paymentMethods[1];

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
                  {['account_name', 'account_no', 'bank_name', 'note'].map((key) => (
                    <React.Fragment key={key}>
                      <div className="bank-info__label text-right mr-3">
                        {t(`checkout:bank_info__${key}`)}
                      </div>
                      <div className="bank-info__content">{bankTransfer[key]}</div>
                    </React.Fragment>
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
