import React, { ReactNode } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useUser } from 'src/contexts/User';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import LoadingBackdrop from '../Layout/LoadingBackdrop';
import Nav from '../Layout/Nav';

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const { loading: gettingCart } = useCart();

  const { loading: gettingUser } = useUser();

  return (
    <>
      <Header />

      <Nav />

      <LoadingBackdrop open={gettingCart || gettingUser} />

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
  'password'
];
