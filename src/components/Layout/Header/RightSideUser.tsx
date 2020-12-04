import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import useUser from 'src/hooks/useUser';
import { mockMyNoti } from 'src/mockData/mockMyNoti';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const NotiItem = (props) => {
  return (
    <>
      <Link href="/">
        <a className="notification__dropdown-item unread">
          <div className="notification__icon">
            <i className="status-icon status-notice"></i>
          </div>
          <div className="notification__content">
            <div className="notification__content-title">{props.name}</div>
            <small className="notification__content-created-at">{props.time}</small>
          </div>
        </a>
      </Link>
    </>
  );
};

const RightSideUser = () => {
  const { user } = useUser();

  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((show) => !show);
  }

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
          <span className="notification__counter">{mockMyNoti.length}</span>
          <div
            className={clsx(
              'dropdown-menu dropdown-menu-right notification__dropdown p-0 ',
              show && 'show'
            )}>
            {mockMyNoti.map((item, index) => {
              return <NotiItem key={index} {...item} />;
            })}
            <div className="dropdown__item notification__view-all">
              <Link href="/notifications">
                <a>Xem tất cả thông báo</a>
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
