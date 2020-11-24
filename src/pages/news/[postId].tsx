import { useRouter } from 'next/router';
import React from 'react';
import News from 'src/components/Modules/News';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import NewsDetail from '../../components/Modules/NewsDetail/NewsDetail';

const NewsPage = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <News>
        <NewsDetail></NewsDetail>
      </News>
      
      <Footer />
    </>
  );
};

NewsPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default NewsPage;
