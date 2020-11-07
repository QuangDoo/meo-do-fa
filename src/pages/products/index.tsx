import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import { withTranslation } from '../../../i18n';
import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import ProductsPage from '../../components/Modules/Products';
import { CategoriesProvider } from '../../contexts/Categories';
import { GET_CATEGORIES } from '../../graphql/category/category.query';
import withApollo from '../../utils/withApollo';

type CategoryType = {
  id: number;
  name: string;
  complete_name: string;
};

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

const WithTranslation = withTranslation('')(Products);

export default withApollo({ ssr: true })(WithTranslation);
