import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';
import CheckoutPage from '../components/Modules/Checkout';

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

export default Checkout;
