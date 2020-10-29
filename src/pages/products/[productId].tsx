import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Head from '../../components/Head';
import { Header } from '../../components/Header';
import Layout from '../../components/Layout/Layout';
import { Nav } from '../../components/Nav';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import { GET_PRODUCT } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo';

function ProductDetail() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  const { data: dataProduct, loading: loadingProduct, error: errorProduct } = useQuery(
    GET_PRODUCT,
    { variables: { id: Number(productId) } }
  );

  useEffect(() => {
    if (dataProduct) {
      setProduct(dataProduct.getProduct);
    }
  }, [dataProduct]);
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <ProductDetailComponent {...product} />
      </Layout>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(ProductDetail);
