import { Button } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_COUPON, ApplyCouponData, ApplyCouponVars } from 'src/graphql/coupons/applyCoupon';
import { GET_USED_COUPONS, GetUsedCouponsData } from 'src/graphql/coupons/getUsedCoupons';
import { OutputCounsel } from 'src/graphql/order/getCounsel';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

import ApplyPromoCodesDialog from './ApplyPromoCodesDialog';
import Coupon from './Coupon';

type Props = {
  setCounselData: (data: OutputCounsel) => void;
  counselData: OutputCounsel;
};

export default function PromoCodes(props: Props) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['checkout', 'errors']);

  const router = useRouter();

  const {
    data: getUsedCouponsData,
    loading: gettingUsedCoupons,
    refetch: refetchUsedCoupons
  } = useQueryAuth<GetUsedCouponsData, undefined>(GET_USED_COUPONS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      const errorCode = error.graphQLErrors[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    }
  });

  const [applyCoupon, { loading: applyingCoupon }] = useMutationAuth<
    ApplyCouponData,
    ApplyCouponVars
  >(APPLY_COUPON, {
    onError: (error) => {
      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    },
    onCompleted: (data) => {
      toast.success(t('checkout:apply_coupon_success'));
      props?.setCounselData?.(data.applyCoupon);
      setOpen(false);
      refetchUsedCoupons();
    }
  });

  const handleUnapplyCoupon = (code: string) => {
    applyCoupon({
      variables: {
        code: code,
        orderNo: props.counselData?.counsel?.orderNo,
        type: 0
      }
    });
  };

  const handleApplyCoupon = (code: string) => {
    applyCoupon({
      variables: {
        code: code,
        orderNo: props.counselData?.counsel?.orderNo,
        type: 1
      }
    });
  };

  const promotion = props.counselData?.counsel?.promotion;

  const promotions = props.counselData?.counsel?.promotions_coupon;

  return (
    <div className="mb-4">
      <div className="h4 mb-3">{t('checkout:promo_codes_title')}</div>

      {promotion?.coupon_code ? (
        <Coupon
          promotion={promotions[0]}
          onClick={() => handleUnapplyCoupon(promotion.coupon_code)}
        />
      ) : (
        <div className="elevated overflow-hidden">
          <Button
            size="small"
            variant="text"
            color="primary"
            fullWidth
            startIcon={<LocalOfferIcon />}
            onClick={() => setOpen(true)}
            disabled={promotion?.program_name && true}
            classes={{
              root: 'p-3',
              label: 'justify-content-start'
            }}>
            {t('checkout:choose_or_input_promo_code')}
          </Button>

          <ApplyPromoCodesDialog
            open={open}
            onClose={() => setOpen(false)}
            handleApplyCoupon={handleApplyCoupon}
            handleUnapplyCoupon={handleUnapplyCoupon}
            usableCoupons={getUsedCouponsData?.getUsedCoupon || []}
            loading={gettingUsedCoupons || applyingCoupon}
            counselData={props.counselData}
          />
        </div>
      )}

      <LoadingBackdrop open={gettingUsedCoupons || applyingCoupon} />
    </div>
  );
}
