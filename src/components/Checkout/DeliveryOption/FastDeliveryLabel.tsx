import React from 'react';

const FastDeliveryLabel = (): JSX.Element => (
  <>
    Giao hàng nhanh{' '}
    <span className="text-muted checkout__option-fast-shipping-info">
      (Tính thêm{' '}
      <b>
        30.000<span className="unit">đ</span>
      </b>
      )
    </span>
  </>
);

export default FastDeliveryLabel;
