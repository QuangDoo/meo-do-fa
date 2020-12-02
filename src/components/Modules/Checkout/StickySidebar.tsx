import Link from 'next/link';
import React from 'react';
import Button from 'src/components/Form/Button';
import { GetCounselData } from 'src/graphql/order/getCounsel';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import SidebarItem from './SidebarItem';

type Props = ReactHookFormRegister & {
  counselData?: GetCounselData;
};

const StickySidebar = (props: Props): JSX.Element => {
  const { counselData } = props;

  if (!counselData) return;

  const data = counselData.getCounsel;

  return (
    <div className="checkout__sticky">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="d-flex flex-wrap align-items-center">
          Đơn Hàng
          <small className="ml-1">{data.counsel.counsels.length} sản phẩm</small>
        </h4>

        <div>
          <Link href="/cart" passHref>
            <Button size="sm" variant="primary">
              Sửa
            </Button>
          </Link>
        </div>
      </div>

      <div className="elevated checkout__info row no-gutters mb-3">
        <SidebarItem label="Tạm tính">
          <div className="d-flex">
            {data.totalPrice.toLocaleString('de-DE')}
            <span className="unit">đ</span>
          </div>
        </SidebarItem>

        <SidebarItem label="Phí vận chuyển">
          <span data-target="checkout.shippingFee">
            {data.totalShippingFee}
            <span className="unit">đ</span>
          </span>
        </SidebarItem>

        <SidebarItem containerClass="checkout__info-promo"></SidebarItem>

        <SidebarItem label="Thành tiền" containerClass="checkout__info-total">
          <span className="checkout__total">
            {data.totalPrice.toLocaleString('de-DE')}
            <span className="unit">đ</span>
          </span>
        </SidebarItem>
      </div>

      <div className="text-right">
        <div className="mb-2">
          <small>
            Vui lòng kiểm tra kỹ thông tin giao hàng, hình thức thanh toán và nhấn nút &quot;Thanh
            Toán&quot; để hoàn tất đặt hàng.
          </small>
        </div>

        <Button variant="secondary" size="lg" type="submit">
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default StickySidebar;
