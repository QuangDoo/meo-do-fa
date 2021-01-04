import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NotiItem from 'src/components/Modules/Noti/NotiItem';
import useNoti from 'src/hooks/useNoti';
import useUser from 'src/hooks/useUser';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const pageSize = 20;

const RightSideUser = (): JSX.Element => {
  const { user } = useUser();
  const { t } = useTranslation('noti');

  const [show, setShow] = useState(false);

  const router = useRouter();

  const page = +router.query.page || 1;

  const { notifications, refetchNoti } = useNoti({ page, pageSize });

  const notificationsData = notifications?.Notifies;

  useEffect(() => {
    refetchNoti?.();
  }, []);

  function toggleShow() {
    setShow((show) => !show);
  }

  const lengthNotifications = notificationsData?.filter((noti) => {
    if (!noti.isSeen) {
      return noti;
    }
  });

  const size = notificationsData?.length;

  const filterNotifications = notificationsData
    ?.slice(notificationsData?.length - 5, size)
    .map((item) => {
      return item;
    });

  return (
    <div className="header-right d-none d-lg-block">
      <ul className="nav align-items-center">
        {/* Notifications here */}
        <div
          onClick={toggleShow}
          onKeyPress={toggleShow}
          className={clsx('dropdown header-right__link notification mr-2', !show && 'collapsed')}
          role="button"
          tabIndex={0}>
          <i className="far fa-bell header-right__icon" />
          {lengthNotifications?.length > 0 && (
            <span className="notification__counter">{lengthNotifications?.length}</span>
          )}
          <div
            className={clsx(
              'dropdown-menu dropdown-menu-right notification__dropdown p-0 ',
              show && 'show'
            )}>
            {filterNotifications?.length > 0 && (
              <>
                {filterNotifications?.reverse()?.map((item, index) => {
                  return <NotiItem key={index} {...item} />;
                })}
                <div className="dropdown__item notification__view-all">
                  <Link href="/notifications">
                    <a>{t('navbar:see_all_notifications')}</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {user?.name && (
          <div className="header__user ml-3">
            <div className="header__user-name text-center">{user.name}</div>

            {/* <div className="header__user-avatar">
            <img
              alt="medofa.com"
              className="img-fluid"
              src="https://assets.medofa.com/assets/defaults/user-avatar-20b31d55208b900bf14c683f4fb7e9e3f1f5b40feeb291a56dacafb01999d751.svg"
            />
          </div> */}
          </div>
        )}
      </ul>
    </div>
  );
};

export default RightSideUser;
