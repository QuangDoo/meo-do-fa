import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CheckoutPage from 'src/components/Modules/Checkout';
import withApollo from 'src/utils/withApollo';

const Checkout = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <CheckoutPage />

      <Footer />
    </>
  );
};

Checkout.getInitialProps = async () => ({
  namespacesRequired: ['']
});

export default withApollo({ ssr: true })(Checkout);
