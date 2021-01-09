import React, { ReactNode } from 'react';
import { CartProvider } from 'src/contexts/Cart';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Nav from '../Layout/Nav';
import GlobalLoadingBackdrop from './GlobalLoadingBackdrop';

type Props = {
  children: ReactNode;
  token: string;
};

export default function MainLayout(props: Props) {
  return (
    <TokenContext.Provider value={props.token}>
      <UserProvider>
        <CartProvider>
          <Header />

          <Nav />

          <GlobalLoadingBackdrop />

          {props.children}

          <Footer />
        </CartProvider>
      </UserProvider>
    </TokenContext.Provider>
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
