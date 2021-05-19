import React, { useState } from 'react';
import FaceBookLogin from 'react-facebook-login';

export default function LoginFaceBookButton() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const responseFacebook = (response) => {
    console.log(response);
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? null : (
        <FaceBookLogin
          appId="1480275125646533"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
      )}
    </div>
  );
}
