import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProductDetailComponent from 'src/components/Modules/ProductDetail/ProductDetail';
import { GET_PRODUCT } from 'src/graphql/product/product.query';
import withApollo from 'src/utils/withApollo';

function ProductDetail(): JSX.Element {
  const router = useRouter();

  const { productId } = router.query;

  const productPid = (productId as string).split('-').pop().substring(3, 7);

  const { data: dataProduct } = useQuery(GET_PRODUCT, { variables: { id: Number(productPid) } });

  const getNameById = (array, id) => {
    return _.find(array, { id })?.name;
  };

  const title = Number(productPid) ? getNameById(dataProduct, Number(productPid)) : '';

  return (
    <>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

      <Header />

      <Nav />

      <ProductDetailComponent {...(dataProduct?.getProduct || [])} />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(ProductDetail);
