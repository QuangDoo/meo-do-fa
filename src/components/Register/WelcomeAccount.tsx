import React from 'react';

type Props = {
  userTypeName: string;
  onEditClick: () => void;
};

const WelcomeAccount = ({ userTypeName, onEditClick }: Props) => {
  return (
    <div className="welcome-account mb-3">
      Xin chào
      <span className="welcome-account__business"> {userTypeName}!</span>
      <button onClick={onEditClick} className="font-weight-bold text-primary ml-2">
        Chỉnh sửa
      </button>
    </div>
  );
};

export default WelcomeAccount;
