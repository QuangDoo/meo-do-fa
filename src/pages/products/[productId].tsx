import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import ProductDetailComponent from '../../components/Modules/ProductDetail/ProductDetail';
import { GET_PRODUCT } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo';

function ProductDetail(): JSX.Element {
  const router = useRouter();

  const { productId } = router.query;

  const { data: dataProduct, loading: loadingProduct, error: errorProduct } = useQuery(
    GET_PRODUCT,
    { variables: { id: Number(productId) } }
  );

  return (
    <>
      <Head>
        <title>medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProductDetailComponent {...(dataProduct?.getProduct || [])} />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(ProductDetail);
