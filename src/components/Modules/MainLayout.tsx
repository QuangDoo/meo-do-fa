import React, { ReactNode } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';

import ActiveUser from '../Layout/ActiveUser';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import LoadingBackdrop from '../Layout/LoadingBackdrop';
import Nav from '../Layout/Nav';
import TermPopup from './TermPopup';

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { loading: gettingCart } = useCart();

  const { data: dataUser, loading: gettingUser } = useUser();

  const isActive = dataUser?.activated;

  const token = useToken();

  return (
    <>
      <TermPopup />

      {token && !isActive && <ActiveUser />}

      <Header />

      <Nav />

      {token && <LoadingBackdrop open={gettingCart || gettingUser} />}

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
  'myAccount'
];
