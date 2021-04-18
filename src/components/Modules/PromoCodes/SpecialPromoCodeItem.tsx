/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

type Props = {
  couponCode: string;
  desctiption: string;
  couponAmount: string;
};

export default function SpecialPromoCodeItem(props: Props) {
  const imgUrl1 = `https://i.pinimg.com/236x/29/a7/99/29a79925827b3b4d710f84e1a1ebd2f7.jpg`;
  return (
    <div className="coupon2 d-flex">
      <div className="coupon2__image d-flex flex-column justify-content-between">
        <img
          src="/assets/images/logo-md.png"
          alt="medofa"
          className="coupon2__image-logo img-fluid lozad"
        />
        <img src={imgUrl1} className="img-fluid lozad" alt="promotion-image" />
      </div>
      <div className="coupon2__description flex-grow-1 d-flex flex-column justify-content-around">
        <div>
          <div className="coupon2__amount text-max-2">{props.couponAmount}</div>
          <span>{props.desctiption}</span>
        </div>
        <div>
          {props.couponCode !== 'false' && (
            <>
              <div className="coupon2__text">nhập mã</div>
              <div className="coupon2__code">{props.couponCode}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
