import React, { ReactNode } from 'react';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Nav from '../Layout/Nav';
import GlobalLoadingBackdrop from './GlobalLoadingBackdrop';

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  return (
    <>
      <Header />

      <Nav />

      <GlobalLoadingBackdrop />

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
