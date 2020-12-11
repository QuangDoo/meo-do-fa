import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_COUPON_PROGRAMS } from 'src/graphql/coupons/getCouponPrgrams';

import AnotherPromoCodes from './AnotherPromoCodes';
import PromoCodes from './PromoCodes';
import SpecialPromoCodes from './SpecialPromoCodes';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: couponsData, error } = useQuery(GET_COUPON_PROGRAMS);
  // console.log(couponsData?.getCouponPrograms);
  return (
    <>
      <PromoCodes data={couponsData?.getCouponPrograms} />

      <SpecialPromoCodes data={couponsData?.getCouponPrograms} />

      <AnotherPromoCodes data={couponsData?.getCouponPrograms} />
    </>
  );
}
