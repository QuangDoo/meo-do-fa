import { Button } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_COUPON, ApplyCouponData, ApplyCouponVars } from 'src/graphql/coupons/applyCoupon';
import { GET_USED_COUPONS, GetUsedCouponsData } from 'src/graphql/coupons/getUsedCoupons';
import { OutputCounsel, PromotionType } from 'src/graphql/order/getCounsel';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

import ApplyPromoCodesDialog from './ApplyPromoCodesDialog';

type Props = {
  setCounselData: (data: OutputCounsel) => void;
  counselData: OutputCounsel;
};

type CouponProps = {
  promotion: PromotionType;
  onClick: () => void;
};

function Coupon(props: CouponProps) {
  const { t } = useTranslation('checkout');

  const { promotion, onClick } = props;

  return (
    <>
      <div
        key={promotion.coupon_code}
        className="d-flex mt-3 align-items-center justify-content-between promo-coupon">
        <div className="px-2 flex-grow-1 promo-coupon__name-container">
          <div className="promo-coupon__name" title={promotion.program_name}>
            {promotion.program_name}
          </div>
        </div>

        <button type="button" className="px-3 py-4 promo-coupon__unapply-btn" onClick={onClick}>
          {t('checkout:unapply_coupon_btn')}
        </button>
      </div>
    </>
  );
}

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

  return (
    <div className="mb-4">
      <div className="h3 mb-3">{t('checkout:promo_codes_title')}</div>
      <div className="elevated p-3">
        <Button
          size="small"
          variant="text"
          color="primary"
          fullWidth
          startIcon={<LocalOfferIcon />}
          onClick={() => setOpen(true)}
          disabled={promotion?.program_name && true}>
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

        {promotion?.coupon_code && (
          <Coupon
            promotion={promotion}
            onClick={() => handleUnapplyCoupon(promotion.coupon_code)}
          />
        )}
      </div>

      <LoadingBackdrop open={gettingUsedCoupons || applyingCoupon} />
    </div>
  );
}