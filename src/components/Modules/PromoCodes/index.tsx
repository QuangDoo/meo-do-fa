import { useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
import React from 'react';
import LinkText from 'src/components/Form/LinkText';
import { GET_COUPON_PROGRAMS } from 'src/graphql/coupons/getCouponPrograms';

import PromoCodeItem from './PromoCodeItem';
import SpecialPromoCodeItem from './SpecialPromoCodeItem';

export default function PromoCodes() {
  const { data: couponsData } = useQuery(GET_COUPON_PROGRAMS);

  const { t } = useTranslation('promoCodes');

  return (
    <>
      {/* <PromoCodes data={couponsData?.getCouponPrograms} /> */}
      <div className="promo-codes py-5">
        <div className="container mb-3">
          <div className="row">
            <div className="col-12 mb-3">
              <h1>{t('promoCodes:promo_codes')}</h1>
              <p>{t('promoCodes:user_manual')}</p>
              <ol className="pl-5">
                <li>
                  <span>
                    <Trans
                      i18nKey="promoCodes:order"
                      components={{
                        b: <b />,
                        a1: <LinkText href="/quick-order"> </LinkText>,
                        a2: <LinkText href="/products"> </LinkText>
                      }}
                    />
                  </span>
                </li>
                {/* <li>
                  <span>
                    <Trans
                      i18nKey="promoCodes:order_content"
                      components={{
                        b: <b />,
                        a1: <a href="/asd">asd</a>,
                        a2: <a href="/asd">asdasd</a>
                      }}
                    />
                  </span>
                </li> */}
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

        {/* <div className="container">
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
        </div> */}
      </div>

      {/* <div className="special-promocodes pt-4 pb-5 mb-5">
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
      </div> */}

      {/* <SpecialPromoCodes data={couponsData?.getCouponPrograms} /> */}

      <div className="another-promocodes mb-5">
        <div className="container">
          <div className="row mb-3">
            <div className="col text-center">
              <h2>{t('promoCodes:all_promo_codes')}</h2>
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
                    discountType={coupon.discount_type}
                    discountFixedAmount={coupon.discount_fixed_amount}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
