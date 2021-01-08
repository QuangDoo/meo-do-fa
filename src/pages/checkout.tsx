import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CheckoutPage from 'src/components/Modules/Checkout';
import { TokenContext } from 'src/contexts/Token';
import getToken from 'src/utils/getToken';
import protectRoute from 'src/utils/protectRoute';
import withApollo from 'src/utils/withApollo';

Checkout.getInitialProps = async (ctx) => {
  protectRoute(ctx);

  const token = getToken(ctx);

  return {
    namespacesRequired: ['checkout', 'errors', 'common', 'myAccount'],
    token
  };
};

function Checkout(props) {
  return (
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <CheckoutPage />

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(Checkout);
