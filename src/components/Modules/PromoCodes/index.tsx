import { useQuery } from '@apollo/client';
import { Trans } from 'i18n';
import React from 'react';
import { GET_COUPON_PROGRAMS } from 'src/graphql/coupons/getCouponPrgrams';
import { SpecialCoupons } from 'src/mockData/mockSpecialCoupons';

import PromoCodeItem from './PromoCodeItem';
import SpecialPromoCodeItem from './SpecialPromoCodeItem';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: couponsData, error } = useQuery(GET_COUPON_PROGRAMS);
  // console.log(couponsData?.getCouponPrograms);
  return (
    <>
      {/* <PromoCodes data={couponsData?.getCouponPrograms} /> */}
      <div className="promo-codes py-5">
        <div className="container mb-3">
          <div className="row">
            <div className="col-12 mb-3">
              <h1>
                <Trans i18nKey="promoCodes:promo_codes" />
              </h1>
              <p>
                <Trans i18nKey="promoCodes:user_manual" />
              </p>
              <ol className="pl-5">
                <li>
                  <span>
                    <Trans
                      i18nKey="promoCodes:order"
                      components={{
                        b: <b />,
                        a1: <a href="/asd">asd</a>,
                        a2: <a href="/asd">asdasd</a>
                      }}
                    />
                  </span>
                </li>
                <li>
                  <span>
                    <Trans
                      i18nKey="promoCodes:order_content"
                      components={{
                        a1: <a href="/asd">asd</a>,
                        a2: <a href="/asd">asdasd</a>
                      }}
                    />
                  </span>
                </li>
                <li>
                  <span>
                    <Trans
                      i18nKey="promoCodes:use_promocode"
                      components={{
                        b: <b />
                      }}
                    />
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-center">
                <Trans i18nKey="promoCodes:just_for_you" />
              </h2>
              <p>
                <Trans
                  i18nKey="promoCodes:just_for_you_content"
                  components={{
                    a1: <a href="/">Giới thiệu bạn bè</a>,
                    a2: <a href="/">Đổi điểm tích luỹ</a>
                  }}
                />
              </p>
            </div>
          </div>
          <div className="row" />
        </div>
      </div>

      <div className="special-promocodes pt-4 pb-5 mb-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="text-white">
                <Trans i18nKey="promoCodes:special_codes" />
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 coupons2">
              {couponsData?.getCouponPrograms &&
                couponsData?.getCouponPrograms.map((coupon, index) => (
                  <SpecialPromoCodeItem
                    key={index}
                    couponAmount={coupon.name}
                    couponCode={coupon.promo_code}
                    desctiption={coupon.reward_id[1]}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* <SpecialPromoCodes data={couponsData?.getCouponPrograms} /> */}

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
              {couponsData?.getCouponPrograms &&
                couponsData?.getCouponPrograms.map((coupon, index) => (
                  <PromoCodeItem
                    key={index}
                    rewardType={coupon.reward_type}
                    couponName={coupon.name}
                    couponCode={coupon.promo_code}
                    couponDescription={coupon.reward_id[1]}
                    discount={coupon.discount_percentage}
                    couponDateFrom={coupon.rule_date_from}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
