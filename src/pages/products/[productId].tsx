import { useQuery } from '@apollo/react-hooks';
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

  const { data: dataProduct } = useQuery(GET_PRODUCT, { variables: { id: Number(productId) } });

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
