/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Trans } from 'i18n';
import React from 'react';

import { Coupons } from '../../../mockData/mockCoupons';
import PromoCodeItem from './PromoCodeItem';

export default function AnotherPromoCodes(props) {
  return (
    <div className="another-promocodes mb-5">
      <div className="container">
        <div className="row mb-3">
          <div className="col text-center">
            <h2>
              <Trans i18nKey="promoCodes:another_codes" />
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 coupons">
            {Coupons.map((coupon, index) => (
              <PromoCodeItem
                key={index}
                type={coupon.type}
                couponName={coupon.couponName}
                couponCode={coupon.couponCode}
                couponAmount={coupon.couponAmount}
                couponDescription={coupon.couponDescription}
                discount={coupon.discount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
