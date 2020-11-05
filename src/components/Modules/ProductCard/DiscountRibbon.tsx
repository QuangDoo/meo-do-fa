import React from 'react';

type Props = {
  discountPercent: number;
};

export const DiscountRibbon = (props: Props): JSX.Element => (
  <div className="ribbon price_down">
    <span className="ribbon-percent">{props.discountPercent}%</span>
    <span className="ribbon-status">Giảm</span>
  </div>
);
