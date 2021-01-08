import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import { TokenContext } from 'src/contexts/Token';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

QuickOrder.getInitialProps = async (ctx) => ({
  namespacesRequired: [
    'header',
    'navbar',
    'footer',
    'errors',
    'common',
    'login',
    'register',
    'password',
    'searchBar',
    'noti',
    'cart',
    'quickOrder'
  ],
  token: getToken(ctx)
});

function QuickOrder(props) {
  return (
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <QuickOrderPage />

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(QuickOrder);
