import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';
import DealsPage from '../components/Modules/Deals';

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
