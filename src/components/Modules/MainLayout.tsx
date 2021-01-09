import React, { ReactNode } from 'react';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Nav from '../Layout/Nav';

type Props = {
  children: ReactNode;
  token: string;
};

export default function MainLayout(props: Props) {
  return (
    <TokenContext.Provider value={props.token}>
      <UserProvider>
        <Header />

        <Nav />

        {props.children}

        <Footer />
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
