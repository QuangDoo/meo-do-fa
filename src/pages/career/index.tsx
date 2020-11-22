import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Jobs from '../../components/Modules/Jobs'

const News = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <Jobs/>

      <Footer />
    </>
  );
};

News.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default News;
