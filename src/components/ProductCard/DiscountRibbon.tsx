import React from 'react';

type DiscountRibbonProps = {
  discountPercent: number;
};

export const DiscountRibbon = (props: DiscountRibbonProps) => (
  <div className="ribbon price_down">
    <span className="ribbon-percent">{props.discountPercent}%</span>
    <span className="ribbon-status">Giảm</span>
  </div>
);
