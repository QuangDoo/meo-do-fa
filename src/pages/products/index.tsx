import { withTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProductsPage from 'src/components/Modules/Products';
import withApollo from 'src/utils/withApollo';

function Products(): JSX.Element {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <ProductsPage />
      <Footer />
    </>
  );
}

const PageWithTranslation = withTranslation('')(Products);

const PageWithApollo = withApollo({ ssr: true })(PageWithTranslation);

export default PageWithApollo;
