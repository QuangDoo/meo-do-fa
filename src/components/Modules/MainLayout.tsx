import React, { ReactNode } from 'react';
import { useToken } from 'src/contexts/Token';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Nav from '../Layout/Nav';

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  const token = useToken();

  return (
    <>
      <Header />

      <Nav />

      {props.children}

      <Footer />
    </>
  );
}
