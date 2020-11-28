import React from 'react';
import { useUserContext } from 'src/contexts/User';
import useUser from 'src/hooks/useUser';

type NotiItem = {
  time: string;
  notiInfo: string;
};

const notiItem: NotiItem[] = [
  {
    notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá',
    time: '1 ngày trước'
  },
  {
    notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá',
    time: '1 ngày trước'
  },
  {
    notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá',
    time: '1 ngày trước'
  },
  {
    notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá',
    time: '1 ngày trước'
  },
  {
    notiInfo: 'Giá sản phẩm Phosphalugel Boehringer Ingelheim (H/26g) đã được cập nhật giá',
    time: '1 ngày trước'
  }
];
const RightSideUser = () => {
  const { user } = useUser();

  return (
    <div className="header-right d-none d-lg-block w-25">
      <ul className="nav align-items-center">
        {/* Notifications here */}

        <div className="header__user ml-3">
          <div className="header__user-name text-center">{user?.getUser?.name}</div>
          {/* <div className="header__user-avatar">
            <img
              alt="medofa.vn"
              className="img-fluid"
              src="https://assets.medofa.vn/assets/defaults/user-avatar-20b31d55208b900bf14c683f4fb7e9e3f1f5b40feeb291a56dacafb01999d751.svg"
            />
          </div> */}
        </div>
      </ul>
    </div>
  );
};

export default RightSideUser;
