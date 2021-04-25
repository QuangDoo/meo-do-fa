import { useTranslation } from 'i18n';
import React from 'react';

type Props = {
  discountPercent: number;
};

export const DiscountRibbon = (props: Props) => {
  return (
    <div className="ribbon price_down">
      <span className="ribbon-percent">-{props.discountPercent}%</span>
      {/* <span className="ribbon-status">{t('productCard:off')}</span> */}
    </div>
  );
};
