import ServerCookies from 'cookies';
import ClientCookies from 'js-cookie';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CheckoutPage from 'src/components/Modules/Checkout';
import withApollo from 'src/utils/withApollo';

const Checkout = (props) => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <CheckoutPage token={props.token} />

      <Footer />
    </>
  );
};

Checkout.getInitialProps = async (ctx) => {
  let token;

  if (typeof window !== 'undefined') {
    token = ClientCookies.get('token');
    console.log('getInitialProps on client');
  } else {
    token = new ServerCookies(ctx.req, ctx.res).get('token');
  }

  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/'
    });

    ctx.res.end();
  }

  return {
    namespacesRequired: ['checkout', 'errors', 'common', 'myAccount'],
    token: decodeURIComponent(token)
  };
};

export default withApollo({ ssr: true })(Checkout);
