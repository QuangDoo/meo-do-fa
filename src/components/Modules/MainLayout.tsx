import React, { ReactNode } from 'react';
import { TokenContext } from 'src/contexts/Token';

import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Nav from '../Layout/Nav';

type Props = {
  token: string;
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  return (
    <TokenContext.Provider value={props.token}>
      <Header />

      <Nav />

      {props.children}

      <Footer />
    </TokenContext.Provider>
  );
}
