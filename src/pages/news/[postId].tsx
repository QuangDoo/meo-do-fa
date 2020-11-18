import { useRouter } from 'next/router';
import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import { NewsLayout } from '../../components/Layout/NewsLayout';
import NewDetail from '../../components/Layout/NewsLayout/NewDetail';

const News = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <NewsLayout>
        <NewDetail></NewDetail>
      </NewsLayout>

      <Footer />
    </>
  );
};

News.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default News;
