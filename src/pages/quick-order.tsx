import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';
import PageLayout from '../components/Layout/PageLayout';

function QuickOrder(): JSX.Element {
  return (
    <>
      <Head>
        <title>Medofa</title>
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

export default QuickOrder;
