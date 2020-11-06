import { withTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProductsPage from 'src/components/Modules/Products';
import { CategoriesProvider } from 'src/contexts/Categories';
import withApollo from 'src/utils/withApollo';

function Products(): JSX.Element {
  return (
    <CategoriesProvider>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <ProductsPage />
      <Footer />
    </CategoriesProvider>
  );
}

const PageWithTranslation = withTranslation('')(Products);

const PageWithApollo = withApollo({ ssr: true })(PageWithTranslation);

export default PageWithApollo;
