import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useUser from 'src/hooks/useUser';

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
  const { t } = useTranslation(['navbar', 'common']);
  const { user } = useUser();

  return (
    <aside className="my-account__sidebar mb-3">
      <div className="mb-3">
        {t('navbar:account_of')}
        <h5>{user?.name}</h5>
      </div>

      <SidebarLink
        text={t('navbar:account_info')}
        href="/my-account"
        iconClass="fas fa-user-circle"
      />

      <SidebarLink
        text={t('navbar:my_order')}
        href="/my-orders"
        iconClass="icomoon icon-assignment"
      />

      {/* <SidebarLink
        text={t('navbar:introduce_friends')}
        href="/users/referrals"
        iconClass="icomoon icon-share"
      /> */}

      <SidebarLink
        text={t('navbar:my_promo_code')}
        href="/my-promo-codes"
        iconClass="fas fa-tags"
      />

      {/* <SidebarLink
        text={t('navbar:cumulative_points')}
        href="/users/loyalty_points"
        iconClass="fas fa-hand-holding-usd"
      /> */}

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
