import React from 'react';

import { withTranslation } from '../../../i18n';
import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import ProductsPage from '../../components/Modules/Products';
import withApollo from '../../utils/withApollo';

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

const WithTranslation = withTranslation('')(Products);

export default withApollo({ ssr: true })(WithTranslation);
