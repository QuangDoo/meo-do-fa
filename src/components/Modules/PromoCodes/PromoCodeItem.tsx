import React from 'react';

type Props = {
  rewardType: string;
  couponName?: string;
  couponCode: string;
  couponDescription?: string;
  discount?: string;
  couponDateFrom?: string;
};

export default function PromoCodeItem(props: Props) {
  const imgUrl = '/assets/images/gift.jpg';
  const { rewardType } = props;

  const leftPromoCode = (rewardType) => {
    switch (rewardType) {
      case 'product':
        return (
          <div className="mb-1 benefit">
            <div className="discount">
              <img src={imgUrl} alt="coupon gift" className="img-fluid" width={60} height={60} />
            </div>
            <div className="suffix">Quà Tặng</div>
          </div>
        );
      case 'discount':
        return (
          <div className="mb-1 benefit">
            <div className="discount">
              {`discount ${props.discount}%`}
              {/* <span className="unit">đ</span> */}
            </div>
            <div className="suffix">Giảm Giá</div>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className={`row no-gutters coupon coupon--${props.rewardType}`}>
      <div className="col-4 deal-info pr-3 d-flex flex-column justify-content-between align-items-center">
        {leftPromoCode(rewardType)}
        {props.couponDateFrom !== 'false' && (
          <div className="text-muted">{`HSD: ${props.couponDateFrom}`}</div>
        )}
      </div>
      <div className="col-8 d-flex flex-column justify-content-between text-center">
        <div className="mb-2">
          <div className="coupon__amount text-max-2">{props.couponName}</div>
          <span>{props.couponDescription}</span>
        </div>
        {props.couponCode !== 'false' && (
          <div className="coupon__code mb-2">{props.couponCode}</div>
        )}

        <div className="coupon__button">
          <a href="/products" className="btn btn-primary btn-sm btn-block">
            Đặt hàng ngay
          </a>
        </div>
      </div>
    </div>
  );
}
