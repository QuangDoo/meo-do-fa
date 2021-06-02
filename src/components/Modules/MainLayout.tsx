import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';

import ActiveUser from '../Layout/ActiveUser';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import LoadingBackdrop from '../Layout/LoadingBackdrop';
import Nav from '../Layout/Nav';
import ConfirmAccountModal from './ConfirmAccountModal';

// import ActiceUser from '../Layout/ActiceUser';
const DynamicTermPopup = dynamic(() => import('./TermPopup'));

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { loading: loadingCart } = useCart();

  const { data: dataUser, loading: gettingUser } = useUser();

  const isActive = dataUser?.activated;

  const isAuthOtp = dataUser?.is_auth_otp;

  const { openModal } = useModalControlDispatch();

  const token = useToken();

  return (
    <>
      <DynamicTermPopup />

      {token && isActive && <ActiveUser waiting={dataUser?.waiting} />}

      <Header />

      <Nav />

      {token && isAuthOtp && openModal('CONFIRM_ACCOUNT')}

      {token && <LoadingBackdrop open={loadingCart || gettingUser} />}

      {/* {isAuthOtp && } */}

      {props.children}

      <Footer />
    </>
  );
}

export const mainLayoutNamespacesRequired = [
  'searchBar',
  'noti',
  'navbar',
  'header',
  'footer',
  'common',
  'errors',
  'login',
  'register',
  'password',
  'termPopup',
  'promotions',
  'myAccount',
  'cart'
];
