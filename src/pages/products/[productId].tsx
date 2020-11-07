import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import ProductDetailComponent from '../../components/Modules/ProductDetail/ProductDetail';
import { GET_PRODUCT } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo';

function ProductDetail(): JSX.Element {
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
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProductDetailComponent {...product} />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(ProductDetail);
