import React from 'react';

type Props = {
  type: string;
  couponName?: string;
  couponCode: string;
  couponAmount?: string;
  couponDescription?: string;
  discount?: string;
};

export default function PromoCodeItem(props: Props) {
  const imgUrl =
    'https://assets.thuocsi.vn/assets/defaults/qua_tang-d6b9623d40a9924ac56d42815f5ed983f93ef06a88ec91c36261bb3bbb222553.jpg';
  const { type } = props;

  const leftPromoCode = (type) => {
    switch (type) {
      case 'gift':
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
              {props.discount}
              {/* <span className="unit">đ</span> */}
            </div>
            <div className="suffix">Giảm Giá</div>
          </div>
        );
      default:
        return;
    }
  };

  const titlePromoCode = (type) => {
    switch (type) {
      case 'gift':
        return (
          <div className="mb-2">
            <div className="coupon__name">{props.couponName}</div>
          </div>
        );
      case 'discount':
        return (
          <div className="mb-2">
            <div className="coupon__amount">
              {props.couponAmount}
              <span className="unit">đ</span>
            </div>
            <span>
              {props.couponDescription}
              <span className="unit">đ</span>
            </span>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className={`row no-gutters coupon coupon--${props.type}`}>
      <div className="col-4 deal-info pr-3 d-flex flex-column justify-content-between align-items-center">
        {leftPromoCode(type)}
        <div className="text-muted">Còn 05 ngày 11:13:54</div>
      </div>
      <div className="col-8 d-flex flex-column justify-content-between text-center">
        {titlePromoCode(type)}
        <div className="coupon__code mb-2">{props.couponCode}</div>
        <div className="coupon__button">
          <a href="/products" className="btn btn-primary btn-sm btn-block">
            Đặt hàng ngay
          </a>
        </div>
      </div>
    </div>
  );
}
