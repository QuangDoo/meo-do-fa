import React from 'react';
import { SpecialCoupons } from 'src/mockData/mockSpecialCoupons';

import SpecialPromoCodeItem from './SpecialPromoCodeItem';

export default function SpecialPromoCodes() {
  return (
    <div className="special-promocodes pt-4 pb-5 mb-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="text-white">Mã giảm giá đặc biệt</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 coupons2">
            {SpecialCoupons.map((coupon, index) => (
              <SpecialPromoCodeItem
                key={index}
                couponAmount={coupon.couponAmount}
                couponCode={coupon.couponCode}
                desctiption={coupon.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
