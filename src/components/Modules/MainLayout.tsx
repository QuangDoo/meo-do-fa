import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';

import ActiveUser from '../Layout/ActiveUser';

// import ActiceUser from '../Layout/ActiceUser';
const DynamicTermPopup = dynamic(() => import('./TermPopup'));
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import LoadingBackdrop from '../Layout/LoadingBackdrop';
import Nav from '../Layout/Nav';

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { loading: loadingCart } = useCart();

  const { data: dataUser, loading: gettingUser } = useUser();

  const isActive = dataUser?.activated;

  const token = useToken();

  return (
    <>
      <DynamicTermPopup />

      {token && !isActive && <ActiveUser waiting={dataUser?.waiting} />}

      <Header />

      <Nav />

      {token && <LoadingBackdrop open={loadingCart || gettingUser} />}

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
