import { useTranslation } from 'i18n';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import { PromotionInfo } from 'src/graphql/order/getCounsel';

type Props = {
  promotion: PromotionInfo;
  onClick: () => void;
};

export default function Coupon(props: Props) {
  const { t } = useTranslation(['checkout']);

  const { promotion, onClick } = props;

  return (
    <div
      key={promotion.id}
      className="mt-3 align-items-center justify-content-between promo-coupon">
      <div className="p-3 flex-grow-1 promo-coupon__name-container">
        <div className="promo-coupon__name" title={promotion.name}>
          {promotion.name}
        </div>

        <div className="promo-coupon__amount">
          {'Giảm giá '}

          {!!promotion.discount_fixed_amount && (
            <PriceText price={promotion.discount_fixed_amount} />
          )}

          {!!promotion.discount_percentage && promotion.discount_percentage + '%'}
        </div>
      </div>

      <button type="button" className="px-3 py-4 promo-coupon__unapply-btn" onClick={onClick}>
        {t('checkout:unapply_coupon_btn')}
      </button>
    </div>
  );
}
