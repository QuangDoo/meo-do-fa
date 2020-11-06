import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';
import PageLayout from '../components/Layout/PageLayout';

function PromotionCode(): JSX.Element {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <h1>PromotionCode Component here !</h1>
      </PageLayout>
      <Footer />
    </>
  );
}

export default PromotionCode;
