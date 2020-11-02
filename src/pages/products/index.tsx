import React from 'react';

import { withTranslation } from '../../../i18n';
import Footer from '../../components/Footer';
import Head from '../../components/Head';
import { Header } from '../../components/Header';
import { Nav } from '../../components/Nav';
import ProductsPage from '../../components/Products';
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
