import React from 'react';

const RightSideUser = () => {
  return (
    <div className="header-right">
      <ul className="nav align-items-center">
        {/* Notifications here */}

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
