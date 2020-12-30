import Cookies from 'cookies';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CheckoutPage from 'src/components/Modules/Checkout';
import withApollo from 'src/utils/withApollo';

const Checkout = (props) => {
  console.log('token from server:', props.token);
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

Checkout.getInitialProps = async (ctx) => {
  const token = new Cookies(ctx.req, ctx.res).get('token');

  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/'
    });

    ctx.res.end();
  }

  return {
    namespacesRequired: ['checkout', 'errors', 'common', 'myAccount'],
    token: token
  };
};

export default withApollo({ ssr: true })(Checkout);
