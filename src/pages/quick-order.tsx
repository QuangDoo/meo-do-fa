import React from 'react';

import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import Layout from '../components/Layout/Layout';
import { Nav } from '../components/Nav';

function QuickOrder(): JSX.Element {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <h1>PromotionCode Component here !</h1>
      </Layout>
      <Footer />
    </>
  );
}

export default QuickOrder;
