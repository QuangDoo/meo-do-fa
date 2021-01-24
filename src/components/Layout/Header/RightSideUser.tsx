import { ClickAwayListener } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NotiItem from 'src/components/Modules/Noti/NotiItem';
import { useNotify } from 'src/contexts/Notify';
import { useUser } from 'src/contexts/User';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const pageSize = 5;

const RightSideUser = () => {
  const { data: user } = useUser();

  const { t } = useTranslation('noti');

  const [show, setShow] = useState(false);

  const { data, getNotify, refetch, loading } = useNotify();

  const notificationsData = data || [];

  useEffect(() => {
    getNotify({ variables: { page: 1, pageSize: pageSize } });
  }, []);

  useEffect(() => {
    if (!data) return;

    refetch();
  }, [data]);

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
        <ClickAwayListener onClickAway={() => setShow(false)}>
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
                    <NotiItem key={index} {...item} loading={loading} />
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
        </ClickAwayListener>

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
