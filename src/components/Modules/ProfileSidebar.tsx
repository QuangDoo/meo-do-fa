import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from 'src/contexts/User';

type SidebarLinkProps = {
  href: string;
  iconClass: string;
  text: string;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, iconClass, text } = props;

  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={clsx(
          'my-account__sidebar-item my-account__sidebar-link',
          router.pathname === href && 'active'
        )}>
        <i className={clsx('my-account__sidebar-icon', iconClass)} />
        {text}
      </a>
    </Link>
  );
};

const ProfileSidebar = () => {
  const { user } = useUser();

  return (
    <aside className="my-account__sidebar mb-3">
      <div className="mb-3">
        Tài khoản của
        <h5>{user?.name}</h5>
      </div>

      <SidebarLink text="Thông tin tài khoản" href="/my-account" iconClass="fas fa-user-circle" />

      <SidebarLink text="Đơn hàng của tôi" href="/my-orders" iconClass="icomoon icon-assignment" />

      <SidebarLink
        text="Giới thiệu bạn bè"
        href="/users/referrals"
        iconClass="icomoon icon-share"
      />

      <SidebarLink
        text="Mã giảm giá của tôi"
        href="/users/user-promo-codes"
        iconClass="fas fa-tags"
      />

      <SidebarLink
        text="Điểm tích lũy"
        href="/users/loyalty_points"
        iconClass="fas fa-hand-holding-usd"
      />

      <div className="my-account__sidebar-item">
        Ví -{' '}
        <span>
          0<span className="unit">đ</span>
        </span>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
