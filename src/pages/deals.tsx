import React from 'react';

import DealsPage from '../components/Deals';
import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';

function Deal() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />

      <Nav />

      <DealsPage />

      <Footer />
    </>
  );
}

export default Deal;
