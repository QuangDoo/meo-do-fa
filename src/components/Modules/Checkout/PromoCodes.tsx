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
    onError: (error) => {
      const errorCode = error.graphQLErrors[0]?.extensions?.code;
      toast.error(t(`errors:code_${errorCode}`));

      if (errorCode === 114) {
        router.push('/cart');
      }
    },
    fetchPolicy: 'network-only'
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

  return (
    <div className="mb-4">
      <div className="h3 mb-3">Mã khuyến mãi</div>
      <div className="elevated p-3">
        <Button
          size="small"
          variant="text"
          color="primary"
          fullWidth
          startIcon={<LocalOfferIcon />}
          onClick={() => setOpen(true)}>
          Chọn hoặc nhập mã khuyến mãi
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

        <div>
          {props.counselData?.counsel?.promotions_coupon?.map((coupon) => (
            <div className="mt-3" key={coupon.id}>
              {coupon.name}
            </div>
          ))}
        </div>
      </div>

      <LoadingBackdrop open={gettingUsedCoupons || applyingCoupon} />
    </div>
  );
}
