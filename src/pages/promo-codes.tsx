import React from 'react';

import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import PageLayout from '../components/layout/PageLayout';
import { Nav } from '../components/Nav';

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
