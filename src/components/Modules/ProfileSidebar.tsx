import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from 'src/contexts/User';

type SidebarLinkProps = {
  href: string;
  icon: string;
  text: string;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, text } = props;

  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={clsx(
          'my-account__sidebar-item my-account__sidebar-link',
          router.pathname === href && 'active'
        )}>
        {/* <i className={clsx('my-account__sidebar-icon', iconClass)} /> */}
        <img className="nav__icon_nav" src={icon} alt="icon_acc_info" />
        {text}
      </a>
    </Link>
  );
};

const ProfileSidebar = () => {
  const { t } = useTranslation(['navbar', 'common']);
  const { data: user } = useUser();

  return (
    <aside className="my-account__sidebar mb-3">
      <div className="mb-3">
        {t('navbar:account_of')}
        <h5 className="text-break">{user?.company_name || user?.name || ''}</h5>
        <h5>{user?.cust_no}</h5>
      </div>

      <SidebarLink
        text={t('navbar:account_info')}
        href="/my-account"
        icon="/assets/images/thongtintaikhoan.png"
      />

      <SidebarLink
        text={t('navbar:my_order')}
        href="/my-orders"
        icon="/assets/images/donhangcuatoi.png"
      />

      <SidebarLink
        text={t('navbar:address_book')}
        href="/my-address-book"
        icon="/assets/images/sodiachi.png"
      />

      {/* <SidebarLink
        text={t('navbar:introduce_friends')}
        href="/users/referrals"
        iconClass="icomoon icon-share"
      /> */}

      <SidebarLink
        text={t('navbar:my_promo_code')}
        href="/my-promo-codes"
        icon="/assets/images/magiamgia.png"
      />
      <SidebarLink
        text={t('navbar:loyalty_points')}
        href="/loyalty-points"
        icon="/assets/images/diemtichluy.png"
      />

      <SidebarLink
        text={t('navbar:change_password')}
        href="/change-password"
        icon="/assets/images/doimatkhau.png"
      />

      <SidebarLink
        text={t('navbar:wish_list')}
        href="/products/wish-list"
        icon="/assets/images/wishlist.png"
      />

      {/* <div className="my-account__sidebar-item">
        {t('navbar:wallet')} -{' '}
        <span>
          0<span className="unit">{t('common:vnd')}</span>
        </span>
      </div> */}
    </aside>
  );
};

export default ProfileSidebar;
