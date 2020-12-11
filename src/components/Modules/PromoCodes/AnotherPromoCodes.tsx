/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Trans } from 'i18n';
import React from 'react';

import { Coupons } from '../../../mockData/mockCoupons';
import PromoCodeItem from './PromoCodeItem';

type Props = {
  active?: boolean;
  id?: number;
  program_type?: string;
  promo_code_usage?: string;
  reward_id?: string[];
  rule_id?: string[];
  sequence?: number;
};

export default function AnotherPromoCodes(props: any) {
  const { data } = props;
  console.log(data);
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
            {data &&
              data.map((coupon, index) => (
                <PromoCodeItem
                  key={coupon.id}
                  type={coupon.promo_code_usage}
                  couponName={coupon.name}
                  couponCode={coupon.promo_code}
                  couponAmount={coupon.reward_id[1]}
                  couponDescription={coupon.reward_id[1]}
                  discount={coupon.discount}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
