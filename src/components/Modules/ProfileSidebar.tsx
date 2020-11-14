import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type SidebarLinkProps = {
  href: string;
  iconName: string;
  iconType: 'fontawesome' | 'icomoon';
  text: string;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const router = useRouter();

  const { href, iconName, iconType, text } = props;

  return (
    <Link href={href}>
      <a
        className={clsx(
          'my-account__sidebar-item my-account__sidebar-link',
          router.pathname === href && 'active'
        )}>
        <i
          className={clsx({
            'my-account__sidebar-icon': true,
            [`fas fa-${iconName}`]: iconType === 'fontawesome',
            [`icomoon icon-${iconName}`]: iconType === 'icomoon'
          })}
        />
        {text}
      </a>
    </Link>
  );
};

const ProfileSidebar = () => {
  return (
    <div className="col-xl-3 d-xl-block d-none">
      <aside className="my-account__sidebar mb-3">
        <div className="mb-3">
          Tài khoản của<h5>Trường</h5>
        </div>

        <SidebarLink
          text="Thông tin tài khoản"
          href="/my-account"
          iconType="fontawesome"
          iconName="user-circle"
        />

        <SidebarLink
          text="Đơn hàng của tôi"
          href="/my-orders"
          iconType="icomoon"
          iconName="assignment"
        />

        <SidebarLink
          text="Giới thiệu bạn bè"
          href="/users/referrals"
          iconType="icomoon"
          iconName="share"
        />

        <SidebarLink
          text="Mã giảm giá của tôi"
          href="/users/user-promo-codes"
          iconType="fontawesome"
          iconName="tags"
        />

        <SidebarLink
          text="Điểm tích lũy"
          href="/users/loyalty_points"
          iconType="fontawesome"
          iconName="hand-holding-usd"
        />

        <div className="my-account__sidebar-item">
          Ví -{' '}
          <span>
            0<span className="unit">đ</span>
          </span>
        </div>
      </aside>
    </div>
  );
};

export default ProfileSidebar;
