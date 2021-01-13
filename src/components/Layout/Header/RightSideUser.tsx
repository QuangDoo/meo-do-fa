import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NotiItem from 'src/components/Modules/Noti/NotiItem';
import { useUser } from 'src/contexts/User';
import useNoti from 'src/hooks/useNoti';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const pageSize = 5;

const RightSideUser = () => {
  const { data: user } = useUser();

  const { t } = useTranslation('noti');

  const [show, setShow] = useState(false);

  const { notifications, refetchNoti } = useNoti({ page: 1, pageSize });

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
              'dropdown-menu dropdown-menu-right notification__dropdown p-0',
              show && 'show'
            )}>
            {notificationsData?.length > 0 && (
              <>
                {notificationsData?.map((item, index) => (
                  <NotiItem key={index} {...item} />
                ))}

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
            <div className="header__user-name text-center">{user?.name}</div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default RightSideUser;
