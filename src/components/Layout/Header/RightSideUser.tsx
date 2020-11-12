import React, { useState } from 'react';
import clsx from 'clsx';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const notiItem: NotiItem[] = [
  { notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá' , time: '1 ngày trước'},
  { notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá' , time: '1 ngày trước'},
  { notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá' , time: '1 ngày trước'},
  { notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá' , time: '1 ngày trước'},
  { notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá' , time: '1 ngày trước'},
];
const RightSideUser = () => {
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow((show) => !show);
  }
  return (
    <div className="header-right">
        <ul className="nav align-items-center">
          <div className="dropdown header-right__link notification mr-2" onClick={toggleShow}>
            <span className="notification__counter">41</span>
            <i className='far fa-bell header-right__icon'  /> 
            {show && ( 
              <div className='dropdown-menu dropdown-menu-right notification__dropdown p-0 show' aria-labelledby="dropdownMenuLink">
              {notiItem.map(({ notiInfo, time }) => (
                <a className="notification__dropdown-item unread" href="#">
                  <div className="notification__icon">
                    <i className="status-icon status-notice"></i>
                  </div>
                  <div className="notification__content">
                      <div className="notification__content-title">{notiInfo}</div>
                      <small className="notification__content-created-at">{time}</small>
                  </div>
                </a>
              ))}
              </div>
            )}
          </div>
          <div className="header__user ml-3">
            <div className="header__user-name mr-5 text-center">Trường</div>
            <div className="header__user-avatar">
              <img
                alt="thuocsi.vn"
                className="img-fluid"
                src="https://assets.thuocsi.vn/assets/defaults/user-avatar-20b31d55208b900bf14c683f4fb7e9e3f1f5b40feeb291a56dacafb01999d751.svg"
              />
            </div>
        </div>
      </ul>
    </div>
  );
};

export default RightSideUser;
