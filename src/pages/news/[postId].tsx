import { useRouter } from 'next/router';
import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import NewsSidebar from '../../components/Modules/News/NewsSidebar';
import NewsDetail from '../../components/Modules/NewsDetail/NewsDetail';

const News = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <PageLayout>
        <div className="row">
          <div className="col-sm-12 col-lg-9">
            <div className="wrapper">
              <div className="row">
                <NewsDetail></NewsDetail>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-3 col-left__divider">
            <NewsSidebar />
          </div>
        </div>
      </PageLayout>

      <Footer />
    </>
  );
};

News.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default News;
