import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import { useTranslation } from 'i18n';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useNoti from 'src/hooks/useNoti';
import useUser from 'src/hooks/useUser';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const NotiItem = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <Link href="/">
        <a className="notification__dropdown-item unread">
          <div className="notification__icon">
            <i className="status-icon status-notice"></i>
          </div>
          <div className="notification__content">
            <div
              className="notification__content-title"
              dangerouslySetInnerHTML={{ __html: props.body }}
            />
            <small className="notification__content-created-at">
              {moment(props.date)
                .locale(`${t('noti:time')}`)
                .fromNow()}
            </small>
          </div>
        </a>
      </Link>
    </>
  );
};

const RightSideUser = () => {
  const { user } = useUser();
  const { t } = useTranslation('noti');

  const [show, setShow] = useState(false);

  const { notifications } = useNoti();

  const notificationsData = notifications?.getNotify;

  useEffect(() => {
    if (!notifications) return;
  }, [notifications]);

  function toggleShow() {
    setShow((show) => !show);
  }

  const size = 8;
  const filterNotifications = notificationsData?.slice(0, size).map((item) => {
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
          <span className="notification__counter">{notificationsData?.length}</span>
          <div
            className={clsx(
              'dropdown-menu dropdown-menu-right notification__dropdown p-0 ',
              show && 'show'
            )}>
            {filterNotifications?.map((item, index) => {
              return <NotiItem key={index} {...item} />;
            })}
            <div className="dropdown__item notification__view-all">
              <Link href="/notifications">
                <a>{t('see_all_noti')}</a>
              </Link>
            </div>
          </div>
        </div>
        {user?.name && (
          <div className="header__user ml-3">
            <div className="header__user-name text-center">{user.name}</div>

            {/* <div className="header__user-avatar">
            <img
              alt="medofa.vn"
              className="img-fluid"
              src="https://assets.medofa.vn/assets/defaults/user-avatar-20b31d55208b900bf14c683f4fb7e9e3f1f5b40feeb291a56dacafb01999d751.svg"
            />
          </div> */}
          </div>
        )}
      </ul>
    </div>
  );
};

export default RightSideUser;
