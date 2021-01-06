import cookies from 'js-cookie';
import Router from 'next/router';
import React, { createContext, useContext } from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CheckoutPage from 'src/components/Modules/Checkout';
import withApollo from 'src/utils/withApollo';

const TokenContext = createContext(null);

export const useToken = () => useContext(TokenContext);

const Checkout = (props) => {
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
};

Checkout.getInitialProps = async (ctx) => {
  const isClient = typeof window !== 'undefined';

  const token = isClient ? cookies.get('token') : ctx.req.cookies.token;

  if (!token) {
    if (isClient) {
      Router.replace('/');
    } else {
      ctx.res.writeHead(302, {
        Location: '/'
      });

      ctx.res.end();
    }
  }

  return {
    namespacesRequired: ['checkout', 'errors', 'common', 'myAccount'],
    token: token
  };
};

export default withApollo({ ssr: true })(Checkout);
